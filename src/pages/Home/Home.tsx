// import NewsletterSection from "@/components/shared/NewsletterSection/NewsletterSection";
import SectionTitle from "@/components/shared/SectionTitle/SectionTitle";
import TestimonialCarousel from "@/components/shared/TestimonialCarousel/TestimonialCarousel";
import BooksCard from "./BooksCard";
import HomeBanner from "./HomeBanner";
import CTASection from "@/components/shared/CTASection/CTASection";

const Home = () => {
  return (
    <div>
      <HomeBanner />
      <SectionTitle title={"Discover Your Next Book"} />
      <BooksCard />
      <SectionTitle title={"Picked by Readers"} />
      <BooksCard />
      <TestimonialCarousel />
      <CTASection />
    </div>
  );
};

export default Home;
