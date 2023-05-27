import { useRouter } from "next/router";
import spreads from "@/public/spreads.json";
import Spread from "@/components/Spread";
import Link from "next/link";

const SpreadPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const spread = spreads.find((spread) => spread.slug === slug);

  return (
    <>
      <Link href="/spreads">
        <span>Back to spreads</span>
      </Link>
      {spread ? <Spread spread={spread} /> : null}
    </>
  );
};

export default SpreadPage;
