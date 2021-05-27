import Link from "next/link";

const Header = () => {

  const authView = () => {
    if(typeof window !== "undefined") {
      const user = JSON.parse(localStorage.getItem('user_data'))
      if(user) {
        return(
        <h3>{user.email}</h3>
        )
      }else {
        return(
          <Link href="/login" prefetch={false}>
          <button className="cursor">Login</button>
        </Link>
        )
      }

    }
  }

  return (
    <header>
      <div className={"logo cursor"}>
        <Link href="/" prefetch={false}>
          <img src="/next_logo.png" alt="next Logo" />
        </Link>
      </div>
      <div>
        {authView()}       
      </div>
    </header>
  );
};

export default Header;
