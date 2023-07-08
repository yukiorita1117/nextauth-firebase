import { getServerSession } from 'next-auth/next';
// path/toは適宜書き換えてください
import { authOptions } from '../app/api/auth/[...nextauth]';

const ServerComponent = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  return <p>{JSON.stringify(user)}</p>;
};

export default ServerComponent;
