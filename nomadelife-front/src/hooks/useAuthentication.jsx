import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signOut } from 'firebase/auth'
import { useState, useEffect } from 'react'

export const useAuthentication = () => {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)
    const [cancelled, setCancelled] = useState(false)

    const auth = getAuth()

    function checkIfIsCancelled() {
        if (cancelled) {
            return
        }
    }

    const register = async (data) => {
        checkIfIsCancelled()

        setLoading(true)
        setError(null)

        try {
            const { user } = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            )
            await updateProfile(user, {
                displayName: data.name
            })

            setLoading(false)
            return user
        } catch (error) {
            console.error(error.message)

            let systemErrorMessage

            if (error.message.includes('Password')) {
                systemErrorMessage = "A senha precisa conter ao menos 6 caracteres."
            } else if (error.message.includes('email-already')) {
                systemErrorMessage = "E-mail já cadastrado em nosso sistema."
            } else {
                systemErrorMessage = "Ocorreu um erro, tente novamente mais tarde."
            }

            setLoading(false)
            setError(systemErrorMessage)
        }
    }


    const login = async (data) => {
        checkIfIsCancelled()

        setLoading(true)
        setError(null)

        try {
            await signInWithEmailAndPassword(
                auth,
                data.email,
                data.password
            )
            setLoading(false)
        } catch (error) {
            console.error(error.message)

            let systemErrorMessage

            if (error.message.includes('invalid-login-credentials')) {
                systemErrorMessage = "Este usuário não tem registro em nossos sistemas."
            } else if (error.message.includes('wrong-password')) {
                systemErrorMessage = "Existe algum erro em suas credenciais de login."
            } else {
                systemErrorMessage = "Ocorreu um erro, tente novamente mais tarde."
            }

            setLoading(false)
            setError(systemErrorMessage)
        }
    }

  
    const logout = () => {
        signOut(auth)
    }

    useEffect(() => {
        return () => setCancelled(true)
    }, [])

    return {
        register,
        login,
        logout,
        error,
        loading
    }
}
