"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup, signInWithRedirect, signInWithEmailAndPassword, getRedirectResult } from 'firebase/auth';
import { toast } from "sonner";
import { getDoc, doc, setDoc, serverTimestamp, Timestamp } from "firebase/firestore";
import { ArrowLeft, Loader } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { auth, db } from "@/firebase/config";
import Footer from "@/components/Footer";


export default function Signup() {
    const err_msg = useRef<HTMLParagraphElement>(null);
    const [formEmail, setFormEmail] = useState("");
    const [formPass, setFormPass] = useState("");
    const [formConfPass, setFormConfPass] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();
    const { user, loading } = useAuth();

    useEffect(() => {
        if(user) {
          router.push('/');
        }
      }, [user, loading,router]);

    const signInWithGoogle = async () => {
      try {
        const provider = new GoogleAuthProvider();
        const result = await signInWithRedirect(auth, provider);
        const response = await getRedirectResult(auth);
        if(response) {
          const userDoc = doc(db, "users", response.user.uid);
          const userSnapshot = await getDoc(userDoc);
          if (userSnapshot.exists()) {
            console.log('L\'utilisateur existe déjà dans Firestore');
            router.push('/');
          } else {
            await setDoc(userDoc, {
              uid: response.user.uid,
              displayName: response.user.displayName,
              email: response.user.email,
              photoURL: response.user.photoURL,
              isActive: true,
              isAdmin: false,
              createdAt: Timestamp.fromDate(new Date()),
              exp_points: 0,
              bio: ""
            });
            setIsLoading(false);
            router.push('/');
            toast.success("Opération réussie",{
              description:`Bienvenue ${response.user.displayName}`
            })
          }
        }
      } catch (error) {
        if(error == "FirebaseError: Firebase: Error (auth/email-already-in-use)." || error== "Nous avons une erreur FirebaseError: Firebase: Error (auth/account-exists-with-different-credential).") {
          err_msg.current!.innerHTML = "Cet adresse email est déjà utilisé";
        }
        console.log('Nous avons une erreur', error)
      }
    }

    const handleForm = async (event:React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setIsLoading(true);
        try {
          const user = await signInWithEmailAndPassword(auth, formEmail, formPass);
          toast.success("Opération réussie",{
            description:"Connexion réussie"
          })
        } 
        catch (error) {
          if(error == "FirebaseError: Firebase: Error (auth/invalid-login-credentials).") {
            err_msg.current!.innerHTML = "Mot de passe incorrect";
            setFormPass("");
          }
          if(error == "FirebaseError: Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests)."){
            err_msg.current!.innerHTML = "Trop de tentatives de connexion, réessayez plus tard.";
            setFormPass("");
          }
          if(error == "FirebaseError: Firebase: Error (auth/invalid-credential)."){
            err_msg.current!.innerHTML = "Adresse e-mail ou mot de passe invalide."
          }
          if(error == "FirebaseError: Firebase: Error (auth/network-request-failed)."){
            err_msg.current!.innerHTML = "Erreur de connexion, vérifiez votre connexion."
          }
          console.log('Nous avons une erreur', error)
        }
        setIsLoading(false);
      }
    
    return (
      <>
    <main>
        <div className="hidden sm:flex" title="Retour à la page précédente">
            <Button
                variant="ghost"
                className="absolute top-[60px] left-[60px] rounded-full py-5 px-5 gap-2 flex"
                onClick={(e) => router.back()}
            >
                <ArrowLeft size={20}/>
                <span className="text-sm">Retour</span>
            </Button>
        </div>
        <section className="max-w-[600px] mx-auto pt-10 md:pt-20 h-[100vh] sm:place-items-center dark:bg-neutral-950"
                 id='signup_page'>
            <section
                className="form_container dark:bg-neutral-950 md:shadow-lg p-5 md:p-12 rounded-lg bg-white md:dark:bg-neutral-900">
                <section className="form_title">
                    <h1 className='mb-5 text-2xl font-extrabold dark:text-white'>Connectez vous</h1>
                    <p ref={err_msg} className='text-sm text-red-600 mb-5'></p>
          </section>
          <form onSubmit={handleForm}>
            <section className="form_body mt-2">
              <div className="text_input flex flex-col gap-5">
                <Label className="font-medium flex flex-col gap-2 " htmlFor="email">
                    <span>Email <sup className="text-red-600 ml-0.5">*</sup>:</span>
                    <Input value={formEmail} onChange={(e) => setFormEmail(e.target.value)} id="email" type="email" className='dark:bg-neutral-900 dark:text-white focus:outline-red-600 py-2 w-full pr-10 placeholder:text-neutral-500 dark:placeholder:text-gray-50' placeholder='Entrez votre adresse email' required/>
                </Label>
                <Label className="font-medium flex flex-col gap-2 " htmlFor="password">
                    <span>Mot de passe <sup className="text-red-600 ml-0.5">*</sup>:</span>
                    <Input value={formPass} onChange={(e) => setFormPass(e.target.value)} id="password" type="password" className='dark:bg-neutral-900 dark:text-white focus:outline-red-600 py-2 w-full pr-10 placeholder:text-neutral-500 dark:placeholder:text-gray-50' placeholder='Entrez votre mot de passe' required/>
                </Label>
              </div>
              <div className="validation pt-5">
                <Button type='submit' disabled={isLoading} variant="default" className="active:scale-95 transition inline-flex justify-center gap-2 py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-600 mt-2 font-medium rounded-lg w-full">Soumettre {isLoading ? <Loader size={20} className="animate-spin"/> : null}</Button>
              </div>
              <div className="other_links flex items-center justify-between my-5 gap-5">
                <p className='text-sm text-neutral-600  dark:text-neutral-100'>Vous avez déjà un compte ?</p>
                <Link href="/signin" className='text-red-600 text-sm hover:underline font-medium'>Connectez vous</Link>
              </div>
              <div className='flex flex-col gap-2'>
                <Button 
                  onClick={signInWithGoogle}
                  variant="danger"
                  type='button'
                  className='active:scale-95 transition bg-red-600 hover:bg-red-500 text-white dark:text-white py-2 px-5 w-full flex items-center gap-2 justify-center rounded-lg text-sm'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-google" viewBox="0 0 16 16">
                        <path d="M15.545 6.558a9.4 9.4 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.7 7.7 0 0 1 5.352 2.082l-2.284 2.284A4.35 4.35 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.8 4.8 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.7 3.7 0 0 0 1.599-2.431H8v-3.08z"/>
                    </svg> 
                    Se connecter avec Google
                </Button>
              </div>
            </section>
          </form>
        </section>
      </section>
    </main>
    <Footer />
    </>
    )
}

