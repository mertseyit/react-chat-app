import PageBox from '../components/layout/PageBox';
import WellComeCard from '../components/pages/home/WellComeCard';

const HomePage = () => {
  return (
    <PageBox>
      <div id="home" className="home">
        <WellComeCard />
      </div>
    </PageBox>
  );
};

export default HomePage;
