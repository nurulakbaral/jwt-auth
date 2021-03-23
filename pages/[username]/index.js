import React from 'react'
import { useRouter } from 'next/router'

const User = () => {
    const router = useRouter()
    const { username } = router.query
    return (
        <section>
            <div>
                <h1>Hello</h1>
                <h1>{username}</h1>
            </div>
        </section>
    )
}

export default User