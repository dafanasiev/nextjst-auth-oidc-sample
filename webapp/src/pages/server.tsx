import { authOptions } from "./api/auth/[...nextauth]"
import type { GetServerSidePropsContext } from "next"
import { getServerSession, type Session } from "next-auth"

// Export the `session` prop to use sessions with Server Side Rendering
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const user_server_session = await getServerSession(context.req, context.res, authOptions);
  return {
    props: {
      user_server_session: user_server_session,
    },
  }
}

export default function Page({ user_server_session }: { user_server_session: Session }) {
  // As this page uses Server Side Rendering, the `session` will be already
  // populated on render without needing to go through a loading stage.
  return (
    <div>
      <h1>Server Side Rendering</h1>
      <p>
        This page uses the <strong>getServerSession()</strong> method in{" "}
        <strong>getServerSideProps()</strong>.
      </p>
      <p>
        Using <strong>getServerSession()</strong> in{" "}
        <strong>getServerSideProps()</strong> is the recommended approach if you
        need to support Server Side Rendering with authentication.
      </p>
      <p>
        The advantage of Server Side Rendering is this page does not require
        client side JavaScript.
      </p>
      <p>
        The disadvantage of Server Side Rendering is that this page is slower to
        render.
      </p>

      <div>
        <br/><br/><br/><hr/>
        <strong>ТЕКУЩАЯ СЕССИЯ</strong><br/>
        <pre>
          {user_server_session ? JSON.stringify(user_server_session, null, 2) : "NOT AUTHORIZED"}
        </pre>
        <br/><hr/>
      </div>


    </div>
  )
}
