import Card from "@/components/common/Card/Card";
import PageContainer from "@/components/common/PageContainer/PageContainer";

import HeroSection from "./components/HeroSection";
import HomeForm from "./components/HomeForm";

const Home = () => {
  return (
    <PageContainer>
      <Card className="w-full max-w-md space-y-8">
        <HeroSection />
        <HomeForm />
      </Card>
    </PageContainer>
  );
};

export default Home;
