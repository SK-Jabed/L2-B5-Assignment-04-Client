import NewsletterSection from "../../Shared/NewsletterSection/NewsletterSection";
import SectionTitle from "../../Shared/SectionTitle/SectionTitle";
import TestimonialCarousel from "../../Shared/TestimonialCarousel/TestimonialCarousel";
import BooksCard from "./BooksCard";
import HomeBanner from "./HomeBanner";

const Home = () => {
  return (
    <div>
      <HomeBanner />
      <SectionTitle title={"Discover Your Next Book"} />
      <BooksCard />
      <NewsletterSection />
      <SectionTitle title={"Picked by Readers"} />
      <BooksCard />
      <TestimonialCarousel />
    </div>
  );
};

export default Home;
