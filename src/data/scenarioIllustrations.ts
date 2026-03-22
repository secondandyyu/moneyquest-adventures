// Swan Level 1 - Banking
import swanL1S1 from "@/assets/scenarios/swan-l1-s1.jpg";
import swanL1S2 from "@/assets/scenarios/swan-l1-s2.jpg";
import swanL1S3 from "@/assets/scenarios/swan-l1-s3.jpg";
// Swan Level 2 - Savings
import swanL2S1 from "@/assets/scenarios/swan-l2-s1.jpg";
import swanL2S2 from "@/assets/scenarios/swan-l2-s2.jpg";
import swanL2S3 from "@/assets/scenarios/swan-l2-s3.jpg";
// Swan Level 3 - Budgeting
import swanL3S1 from "@/assets/scenarios/swan-l3-s1.jpg";
import swanL3S2 from "@/assets/scenarios/swan-l3-s2.jpg";
import swanL3S3 from "@/assets/scenarios/swan-l3-s3.png";
// Swan Level 4 - Investing
import swanL4S1 from "@/assets/scenarios/swan-l4-s1.png";
import swanL4S2 from "@/assets/scenarios/swan-l4-s2.png";
import swanL4S3 from "@/assets/scenarios/swan-l4-s3.png";
// Swan Level 5 - Donations
import swanL5S1 from "@/assets/scenarios/swan-l5-s1.png";
import swanL5S2 from "@/assets/scenarios/swan-l5-s2.png";
import swanL5S3 from "@/assets/scenarios/swan-l5-s3.png";
// Beaver Level 1 - Earning
import beaverL1S1 from "@/assets/scenarios/beaver-l1-s1.jpg";
import beaverL1S2 from "@/assets/scenarios/beaver-l1-s2.jpg";
import beaverL1S3 from "@/assets/scenarios/beaver-l1-s3.jpg";
// Beaver Level 2 - Needs vs Wants
import beaverL2S1 from "@/assets/scenarios/beaver-l2-s1.jpg";
import beaverL2S2 from "@/assets/scenarios/beaver-l2-s2.jpg";
import beaverL2S3 from "@/assets/scenarios/beaver-l2-s3.jpg";
// Beaver Level 3 - Savings
import beaverL3S1 from "@/assets/scenarios/beaver-l3-s1.jpg";
import beaverL3S2 from "@/assets/scenarios/beaver-l3-s2.jpg";
import beaverL3S3 from "@/assets/scenarios/beaver-l3-s3.jpg";
// Beaver Level 4 - Loans
import beaverL4S1 from "@/assets/scenarios/beaver-l4-s1.jpg";
import beaverL4S2 from "@/assets/scenarios/beaver-l4-s2.jpg";
import beaverL4S3 from "@/assets/scenarios/beaver-l4-s3.jpg";
// Dog Level 1 - Loans
import dogL1S1 from "@/assets/scenarios/dog-l1-s1.jpg";
import dogL1S2 from "@/assets/scenarios/dog-l1-s2.jpg";
// Dog Level 2 - Savings
import dogL2S1 from "@/assets/scenarios/dog-l2-s1.jpg";
import dogL2S2 from "@/assets/scenarios/dog-l2-s2.jpg";
// Dog Level 3 - Budgeting
import dogL3S1 from "@/assets/scenarios/dog-l3-s1.jpg";
import dogL3S2 from "@/assets/scenarios/dog-l3-s2.jpg";
// Dog Level 4 - Investing
import dogL4S1 from "@/assets/scenarios/dog-l4-s1.jpg";
import dogL4S2 from "@/assets/scenarios/dog-l4-s2.jpg";
// Dog Level 5 - Donations
import dogL5S1 from "@/assets/scenarios/dog-l5-s1.jpg";
import dogL5S2 from "@/assets/scenarios/dog-l5-s2.jpg";

// Intro images
import swanIntro from "@/assets/scenarios/swan-intro.png";
import beaverIntro from "@/assets/scenarios/beaver-intro.png";
import dogIntro from "@/assets/scenarios/dog-intro.png";

export const scenarioIllustrations: Record<string, string> = {
  "swan-l1-s1": swanL1S1,
  "swan-l1-s2": swanL1S2,
  "swan-l1-s3": swanL1S3,
  "swan-l2-s1": swanL2S1,
  "swan-l2-s2": swanL2S2,
  "swan-l2-s3": swanL2S3,
  "swan-l3-s1": swanL3S1,
  "swan-l3-s2": swanL3S2,
  "swan-l3-s3": swanL3S3,
  "swan-l4-s1": swanL4S1,
  "swan-l4-s2": swanL4S2,
  "swan-l4-s3": swanL4S3,
  "swan-l5-s1": swanL5S1,
  "swan-l5-s2": swanL5S2,
  "swan-l5-s3": swanL5S3,
  "beaver-l1-s1": beaverL1S1,
  "beaver-l1-s2": beaverL1S2,
  "beaver-l1-s3": beaverL1S3,
  "beaver-l2-s1": beaverL2S1,
  "beaver-l2-s2": beaverL2S2,
  "beaver-l2-s3": beaverL2S3,
  "beaver-l3-s1": beaverL3S1,
  "beaver-l3-s2": beaverL3S2,
  "beaver-l3-s3": beaverL3S3,
  "beaver-l4-s1": beaverL4S1,
  "beaver-l4-s2": beaverL4S2,
  "beaver-l4-s3": beaverL4S3,
  "dog-l1-s1": dogL1S1,
  "dog-l1-s2": dogL1S2,
  "dog-l2-s1": dogL2S1,
  "dog-l2-s2": dogL2S2,
  "dog-l3-s1": dogL3S1,
  "dog-l3-s2": dogL3S2,
  "dog-l4-s1": dogL4S1,
  "dog-l4-s2": dogL4S2,
  "dog-l5-s1": dogL5S1,
  "dog-l5-s2": dogL5S2,
};

export const introImages: Record<string, string> = {
  swan: swanIntro,
  beaver: beaverIntro,
  dog: dogIntro,
};

export const introTexts: Record<string, { title: string; description: string }> = {
  swan: {
    title: "Meet Swan!",
    description: "Swan just landed a brand new corporate job at Swan Co.! Follow Swan as they navigate the world of money — from opening a bank account and saving their first paycheck, to budgeting wisely, investing for the future, and giving back to the community. Let's help Swan build a strong financial foundation!",
  },
  beaver: {
    title: "Meet Beaver!",
    description: "Beaver just graduated from high school and is ready to earn their own money! Join Beaver as they get their first job at a bakery, learn the difference between needs and wants, start saving smart on a smaller income, and understand how loans work. Let's help Beaver become financially independent!",
  },
  dog: {
    title: "Meet Dog!",
    description: "Dog is an ambitious entrepreneur starting a snack-making business! Follow Dog as they take out business loans, manage savings while paying off debt, budget with changing income, invest profits wisely, and give back to the community. Let's help Dog build a thriving business!",
  },
};
