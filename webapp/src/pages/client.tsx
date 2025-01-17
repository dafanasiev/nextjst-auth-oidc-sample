import { useSession } from "next-auth/react"

export default function ClientPage() {
  const user_client_session = useSession()

  return (
    <div>
      <h1>Client Side Rendering</h1>
      <p>
        This page uses the <strong>useSession()</strong> React Hook in the{" "}
        <strong>&lt;Header/&gt;</strong> component.
      </p>
      <p>
        The <strong>useSession()</strong> React Hook is easy to use and allows
        pages to render very quickly.
      </p>
      <p>
        The advantage of this approach is that session state is shared between
        pages by using the <strong>Provider</strong> in <strong>_app.js</strong>{" "}
        so that navigation between pages using <strong>useSession()</strong> is
        very fast.
      </p>
      <p>
        The disadvantage of <strong>useSession()</strong> is that it requires
        client side JavaScript.
      </p>

      <div>
        <br/><br/><br/><hr/>
        <strong>ТЕКУЩАЯ СЕССИЯ</strong><br/>
        <pre>
          {user_client_session ? JSON.stringify(user_client_session, null, 2) : "NOT AUTHORIZED"}
        </pre>
        <br/><hr/>
      </div>

    </div>
  )
}
