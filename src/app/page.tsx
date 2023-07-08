import ClientComponent from '@/components/ClientComponent';
import ServerComponent from '@/components/ServerComponent';

const Home = async () => {
  return (
    <main>
      <ClientComponent />
      {/* @ts-ignore */}
      <ServerComponent />
    </main>
  );
};

export default Home;
