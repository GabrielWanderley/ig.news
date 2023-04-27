
import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

import { fauna } from "../../../services/fauna"
import { query as q} from "faunadb"
import { Session } from "inspector"


export const authOptions = {
  
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      authorization:{
        params:{
          scope:'read:user'
        }
      }
    }),
  ],
  callbacks: {

    async Session({session}){
     
      try{
        const userActiveSubscription = await fauna.query<string>(
          q.Get(
           q.Intersection([
            q.Match(
              q.Index('subscripition_by_user_ref'),
              q.Select(
                "ref",
                q.Get(
                  q.Match(
                    q.Index('user_by_email'),
                    q.Casefold(session.user.email)
                  )
                )
              ),
              q.Match(
                q.Index('subscription_by_status'),
                "active"
              )
            )
              ])
          )
        )
  
        return {
          ...session,
          activeSubscription : userActiveSubscription
        }
      } catch {
        return{
          ...Session,
          activeSubsciption : null,
        }
      }
    },

    async signIn({ user, account, profile }) {

      const {email} = user
    
      try{
      await fauna.query(
        q.If(
          q.Not(
            q.Exists(
              q.Match(
                q.Index('user_by_email'),
                q.Casefold(user.email)
              )
            )
          ),
        q.Create(
          q.Collection('users'),
          {data: {email}}
        ), 
        q.Get(
          q.Match(
            q.Index('user_by_email'),
            q.Casefold(user.email)
          )
        )
      )
    )
      return true
        }catch{
      return false
    }
  },
}
}
export default NextAuth(authOptions)