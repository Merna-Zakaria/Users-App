import axios from "axios";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Switch from "../../components/switch";
import DefaultLayout from "../../components/defaultLayout";

export const getStaticPaths = async () => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/users"
  );
  const users = response?.data;
  const paths = users.map((user) => ({
    params: { id: user.id.toString() },
  }));
  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
};

export const getStaticProps = async ({ params }) => {
  const res = await axios.get(
    `https://jsonplaceholder.typicode.com/users/${params.id}`
  );
  const user = res?.data;
  return { props: { user } };
};

const UserDetails = (props) => {
  const router = useRouter();
  useEffect(() => {
    // If the page is not yet generated, this will be displayed
    // initially until getStaticProps() finishes running
    if (router.isFallback) {
      return <div>Loading...</div>;
    }
  });
  const { user } = props;
  return (
    <DefaultLayout>
      <div>
        <h1 className={"title"}>User Details</h1>
        <div className={`d-flex`}>
          <div className={"card"}>
            <div className="justify-between">
              <p>
                {" "}
                Id: <span>{user.id}</span>
              </p>
              <Switch />
            </div>
            <p>
              {" "}
              Name: <span>{user.name}</span>
            </p>
            <p>
              {" "}
              Phone: <span>{user.phone}</span>
            </p>
            <p>
              {" "}
              Email: <span>{user.email}</span>
            </p>
            <p>
              {" "}
              Company: <span>{user.company.name}</span>
            </p>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

// UserDetails.getInitialProps = async ({query}) => {
//     const response = await axios.get(
//         `https://jsonplaceholder.typicode.com/users/${query.id}`
//       );
//       const user = response?.data

//       console.log('propssss', props)
//     return {
//       user
//     }
//   }

export default UserDetails;
