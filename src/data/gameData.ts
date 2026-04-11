export type ChoiceQuality = "best" | "okay" | "bad";

export interface Choice {
  text: string;
  quality: ChoiceQuality;
  xp: number;
}

export interface QuizQuestion {
  text: string;
  choices: Choice[];
  justification: string;
}

export interface Scenario {
  id: string;
  context: string;
  definition?: string;
  teaching?: string;
  choices: Choice[];
  justification: string;
  isQuiz?: boolean;
  illustration?: string;
  questions?: QuizQuestion[];
}

export interface Level {
  id: string;
  title: string;
  topic: string;
  scenarios: Scenario[];
  unlockXP: number;
}

export interface Category {
  id: string;
  name: string;
  guide: "swan" | "beaver" | "dog";
  description: string;
  levels: Level[];
  unlockXP: number;
}

export const categories: Category[] = [
  {
    id: "swan",
    name: "Swan's Journey",
    guide: "swan",
    description: "Join Swan on a corporate career adventure! Learn about banking, saving, budgeting, investing, and giving back.",
    unlockXP: 0,
    levels: [
      {
        id: "swan-l1",
        title: "Banking",
        topic: "Understanding Banks & Accounts",
        unlockXP: 0,
        scenarios: [
          {
            id: "swan-l1-s1",
            context: "You have started your job, and you got your first pay check. But, you do not have a bank account. What bank should you choose?",
            definition: "A bank is a secure place that keeps your money safe while providing tools like cards and apps to help you manage, spend, and grow your funds.",
            choices: [
              { text: "Bank 1: A bank where you have to go in person to make transactions. No online app and no discount offers.", quality: "bad", xp: 100 },
              { text: "Bank 2: A bank where accounts can be modified online with a mobile app and debit/credit cards can earn travel reward points.", quality: "best", xp: 500 },
              { text: "Bank 3: A bank where accounts can be modified online with a mobile app, but there is a fee of 2,000 Won per month to keep your money.", quality: "okay", xp: 300 },
            ],
            justification: "The best choice is Bank 2 because it gives you the \"superpower\" of convenience and rewards. Having a mobile app is like having a bank in your pocket. You don't have to waste time traveling to a building just to see your money. Plus, earning travel points for things you were going to buy anyway is like getting a free gift just for being responsible. Avoiding the monthly fee in Bank 3 is also smart because 2,000 Won might seem small, but over many years, that's money you could have used for something fun!",
          },
          {
            id: "swan-l1-s2",
            context: "You need to decide which accounts to set up with your bank. A checking account allows you to make day-to-day spending and a savings account helps you save for the future.",
            teaching: "Think of a checking account like your backpack — it holds the money you need every day for things like lunch, bus fare, or a new pencil. You can take money in and out whenever you want! A savings account is more like a piggy bank that's locked away safely. The cool part? The bank actually gives you a little extra money called \"interest\" just for keeping your money there. It's like the bank saying \"thank you for letting us hold your money\" by adding a few extra coins over time. The longer you leave your money in savings, the more bonus money you earn! The banks are investing your money while you are not using it, and they give you extra money from the money they earned through investing!",
            choices: [
              { text: "Open both a checking and a savings account, putting most money in checking for daily use.", quality: "okay", xp: 300 },
              { text: "Open both a checking and a savings account, splitting your money wisely between daily spending and saving for the future.", quality: "best", xp: 500 },
              { text: "Open only a checking account since you need money available all the time.", quality: "bad", xp: 100 },
            ],
            justification: "Having both accounts is the smartest move! Your checking account handles daily spending like groceries and transport, while your savings account grows your money over time with interest. Only having a checking account means you miss out on growing your savings.",
          },
          {
            id: "swan-l1-s3",
            context: "You need to make withdrawals to pay for rent, groceries, and new clothes.",
            teaching: "There are different ways to get money out of your bank account, kind of like different ways to send a letter! An ATM is a machine (usually outside a bank or store) where you put in your card and it gives you real paper money — perfect for when you need cash right away. A wire transfer is like sending money through the internet — it \"teleports\" your money from your account straight into someone else's account without anyone touching real cash. It's super safe because there's a digital record of everything! A paper check is an old-fashioned way where you write someone's name on a special piece of paper, and when they take it to the bank, the bank gives them the money from your account.",
            choices: [
              { text: "Use ATMs mostly for immediate transactions for quick or emergency purchases. Use mobile wire for online transfers and rent payment.", quality: "best", xp: 500 },
              { text: "Pay rent with a check, groceries and other payments via wiring.", quality: "okay", xp: 300 },
              { text: "Pay rent with cash through an ATM and keep a large amount of cash in your wallet.", quality: "bad", xp: 100 },
            ],
            justification: "Using the right tool for the right job is the smartest approach. Using an ATM for quick cash is perfect for small things, but using a mobile wire transfer for rent is like sending a \"digital teleport\" of money that is safe, fast, and leaves a receipt. Carrying too much cash is like carrying a treasure chest with no lock because if it's gone, it's gone forever. Using the right digital tools keeps your money behind a strong \"password shield.\"",
          },
        ],
      },
      {
        id: "swan-l2",
        title: "Savings",
        topic: "Building Your Savings",
        unlockXP: 1200,
        scenarios: [
          {
            id: "swan-l2-s1",
            context: "At home, you review your monthly paycheck and list your costs for rent, groceries, transport, taxes, and social plans. You also want to keep saving.",
            choices: [
              { text: "Prioritize your needs only (rent, groceries, transport, taxes). Allocate 70% of your paycheck for needs, 15% for wants, and 15% for savings.", quality: "best", xp: 500 },
              { text: "Prioritize your needs, but also for some fun. Allocate 60% of your paycheck for needs, 30% for wants, and 10% for savings.", quality: "okay", xp: 300 },
              { text: "Prioritize saving for the future rather than focusing on current needs. Allocate 50% of your paycheck for needs, 20% for wants, and 30% for savings.", quality: "bad", xp: 100 },
            ],
            justification: "The 70/15/15 rule is the best because it follows a \"Needs First\" mission. By covering your rent, food, and taxes first, you make sure you have a roof over your head and a full stomach. Setting aside 15% for fun means you still get to enjoy life, and 15% for savings means you're building a mountain of money for later.",
          },
          {
            id: "swan-l2-s2",
            context: "Your old tote bag tears during your commute, and now you need to pick a replacement that balances price, quality, and long-term value.",
            choices: [
              { text: "Buy a cheap bag using your savings. The bag only lasts a couple months and you'll need another one later.", quality: "bad", xp: 100 },
              { text: "Save up for the next month to buy a more expensive bag that fits the current trends. It isn't super durable but is pretty.", quality: "okay", xp: 300 },
              { text: "Save up for the next month to buy an expensive but high quality bag that will last long. It isn't the prettiest but gets its job done best.", quality: "best", xp: 500 },
            ],
            justification: "Choosing the high-quality bag is the best move. Even though it isn't the \"trendiest,\" a sturdy bag is a better investment because you only have to buy it once. If you buy a cheap bag that breaks in two months, you actually end up spending more money over time because you keep buying replacements. It's better to save up for one \"Iron Man\" bag than to buy five \"Cardboard\" bags!",
          },
          {
            id: "swan-l2-s3",
            context: "You realize you need a computer for work now, but you also want to buy a home in the future. You need a savings plan that handles both goals.",
            choices: [
              { text: "Save 15% of your income monthly and prioritize the computer first for work, then increase savings over time for the house.", quality: "best", xp: 500 },
              { text: "Save 15% of your income monthly and prioritize the house first, then the computer.", quality: "okay", xp: 300 },
              { text: "Save 10% of your income monthly for each goal at the same time.", quality: "bad", xp: 100 },
            ],
            justification: "Using \"stepping stones\" is the winner strategy. A computer is a tool that can help you learn, work, and eventually earn even more money. By getting the computer first, you empower yourself to reach the much bigger goal of a house faster. Trying to save for both at once makes progress feel so slow that you might get frustrated and quit. Finishing one small goal gives you the \"Level Up\" energy to tackle the big house goal next!",
          },
        ],
      },
      {
        id: "swan-l3",
        title: "Budgeting",
        topic: "Tracking Your Money",
        unlockXP: 2500,
        scenarios: [
          {
            id: "swan-l3-s1",
            context: "You sit at your desk with a notebook and sticky notes, trying to decide the best way to organize monthly income and expenses.",
            choices: [
              { text: "Write down all expected income and expenses for each month in a small notebook.", quality: "best", xp: 500 },
              { text: "Write down all expected income and expenses for each month on sticky notes in places across your home.", quality: "okay", xp: 300 },
              { text: "Write down only major expenses such as rent, and ignore small daily spending in your notebook.", quality: "bad", xp: 100 },
            ],
            justification: "Your notebook acts like a \"Money Diary.\" When you write everything in one safe place, you can look back and see exactly where your money went. Using sticky notes is a recipe for disaster because they can lose their \"sticky\" and fly away, taking your important information with them! Keeping a notebook ensures you never lose track of your financial story.",
          },
          {
            id: "swan-l3-s2",
            context: "Your desk is covered in receipts and messy notes, so you decide to switch to a cleaner digital method for tracking money.",
            choices: [
              { text: "Create an online spreadsheet with categories (rent, food, transport, savings, fun) and update it weekly.", quality: "best", xp: 500 },
              { text: "Use an online spreadsheet and update it monthly.", quality: "okay", xp: 300 },
              { text: "Continue to write down your income and expenses on your physical notebook weekly, as you have a comfortable setup.", quality: "bad", xp: 100 },
            ],
            justification: "An online spreadsheet is like having a robot assistant who is great at math. By updating it weekly, the information stays fresh in your brain so you don't forget that candy bar you bought on Tuesday. If you wait until the end of the month, it's like trying to remember what you ate for breakfast three weeks ago—nearly impossible! Weekly updates keep your budget accurate and easy to manage.",
          },
          {
            id: "swan-l3-s3",
            context: "A coworker shows you the MoneyCare app and explains how it can link to your bank to track expenses automatically.",
            teaching: "Imagine if an app could manage all your money without having you to worry about it — that's basically what a budgeting app like MoneyCare does! While the bank app only shows your earnings and spendings, budgeting apps like MoneyCare help you make smart money decisions. Some apps can even sort your spending into groups like \"Food,\" \"Fun,\" and \"Transportation\" automatically, so you can see exactly where your money goes each month. It's like having a super-smart helper who watches your money 24 hours a day, 7 days a week, and never takes a break!",
            choices: [
              { text: "Use MoneyCare to manually track your records. Don't connect the app to your bank account.", quality: "okay", xp: 300 },
              { text: "Use MoneyCare to categorize all of your planned income and expenses. The app will also will track all spending and saving with the bank account connection.", quality: "best", xp: 500 },
              { text: "Use MoneyCare to track your card expenses and keep other things (income, savings, etc.) in your physical notebook.", quality: "bad", xp: 100 },
            ],
            justification: "Using technology to do the \"boring\" work for you is the ultimate choice. When the app connects to your bank, it automatically sorts your spending into categories like \"Food\" or \"Games.\" This prevents human error and saves you a ton of time. It's like having a self-cleaning room—instead of picking up every toy yourself, the app puts everything where it belongs automatically.",
          },
        ],
      },
      {
        id: "swan-l4",
        title: "Investing",
        topic: "Growing Your Money",
        unlockXP: 4000,
        scenarios: [
          {
            id: "swan-l4-s1",
            context: "You go out to eat dinner with your friend on a weekend. Your friend explains that she has been multiplying her savings by investing in stocks. You're interested in investing too.",
            teaching: "Imagine a company is like a giant pizza. When you buy a \"stock,\" you're buying one tiny slice of that pizza. If the pizza shop becomes super popular and everyone wants their pizza, your slice becomes worth more money! That's how stocks work — when a company does well, the value of your slice goes up, and you can sell it for more than you paid. But here's the tricky part: if the company does badly, your slice could be worth less. That's why smart investors don't just buy one slice of one pizza — they buy slices from lots of different pizza shops! This is called \"diversification,\" and it means that even if one shop closes, you still have slices from other shops that are doing great.",
            choices: [
              { text: "Invest in \"Stylist\" — a clothing company that makes trendy clothes. Sometimes popular, sometimes not. High growth in the past but stagnant recently.", quality: "bad", xp: 100 },
              { text: "Invest in \"TechKnowlegy\" — a tech company making computers and cars. Some people buy from them as an alternative to other tech giants. Ups and downs in growth.", quality: "okay", xp: 300 },
              { text: "Invest in \"Sunny Snacks Co.\" — a food company most people use for groceries and snacks. They deliver items for convenience. Steady growth for the past three years.", quality: "best", xp: 500 },
            ],
            justification: "Sunny Snacks Co. is the safest and smartest play for a beginner. While tech companies are cool, they can be like a roller coaster—up one day and down the next. However, people always need to eat, no matter what is happening in the world. Investing in a food company that is growing steadily is like planting an oak tree; it might grow slowly, but it is strong, stable, and much less likely to fall over than a trendy fashion company.",
          },
          {
            id: "swan-l4-s2",
            context: "You consider what would happen if you tried short-term investing vs. long-term investing. Short-term investing is risky but can be lucraitve. Long-term investing is safe but slower.",
            teaching: "Think of investing like growing plants. Short-term investing is like picking wildflowers — you grab them quickly, but they don't last very long and sometimes you don't find any at all. You buy something and try to sell it really fast (in days or weeks) hoping the price went up. It can work, but it's very risky because prices bounce around a lot in the short term! Long-term investing is like planting an apple tree. You put a seed in the ground and water it for years. At first, nothing happens. But after a long time, that tiny seed grows into a big tree that gives you apples every single year! Most of the richest and smartest investors in the world are long-term investors because they know that patience is a superpower when it comes to money.",
            choices: [
              { text: "Invest mostly short-term to increase immediate benefits, no matter the riskiness.", quality: "bad", xp: 100 },
              { text: "Invest long-term in stable companies and let your money grow over years.", quality: "best", xp: 500 },
              { text: "Mix short-term and long-term, but lean toward short-term for more excitement.", quality: "okay", xp: 300 },
            ],
            justification: "Long-term investing is the winner for most people. It's like planting a garden — you might not see flowers right away, but over time, your garden becomes beautiful. Short-term trading is stressful and risky, especially for beginners. Patience is the real superpower of investing!",
          },
          {
            id: "swan-l4-s3",
            context: "You worked another month and had some extra money. You want to invest it, so it can grow. Decide how you can invest this money.",
            teaching: "There are different ways to invest your money, like choosing different rides at a theme park! A Mutual Fund is like hiring a really smart adult to pick the best companies for you. They put your money (along with other people's money) into a big basket of different stocks or other financial assets (houses, money market, etc.). You pay them a small fee for doing the hard work of choosing. An Index Fund is similar, but instead of a person choosing, a computer automatically buys stocks from a list of the biggest and most popular companies (like the top 500 companies in America!). Because no person is doing the picking, it costs you much less in fees — and studies show index funds often do just as well! Crypto (short for cryptocurrency) is like digital coins that exist only on computers — Bitcoin is the most famous one. No bank or government controls it. Crytpo’s value can go way up really fast, but it can also crash just as fast—kind of like a roller coaster with no brakes. That’s why most experts say to only invest an amount you would be okay losing.",
            choices: [
              { text: "Put money only in index funds.", quality: "okay", xp: 300 },
              { text: "Put 40% in mutual funds, 50% in index funds, and 10% in crypto.", quality: "best", xp: 500 },
              { text: "Put 70% in crypto and 30% in index funds.", quality: "bad", xp: 100 },
            ],
            justification: "This is the \"Champion's Portfolio\" because it uses diversification. By putting money into Index Funds (very safe), Mutual Funds (managed by pros), and a tiny bit of Crypto (exciting but risky), you aren't putting all your eggs in one basket. If Crypto crashes like a falling star, you only lose a tiny portion. Balance is the key to smart investing!",
          },
        ],
      },
      {
        id: "swan-l5",
        title: "Donations & Charity",
        topic: "Giving Back",
        unlockXP: 5500,
        scenarios: [
          {
            id: "swan-l5-s1",
            context: "You hear that your younger cousin is struggling to pay for school supplies.",
            choices: [
              { text: "Give a one-time amount and reassess if more is needed.", quality: "best", xp: 500 },
              { text: "Give money consistently each month starting now.", quality: "okay", xp: 300 },
              { text: "Give money in small portions until the cost of supplies are covered.", quality: "bad", xp: 100 },
            ],
            justification: "Giving a one-time amount solves the immediate emergency without creating a \"dependency.\" By helping your cousin buy the supplies they need right now, you are being a great family member. However, by not giving money every single month, you are also helping them learn how to manage their own money. It's the perfect mix of being kind and being a good teacher.",
          },
          {
            id: "swan-l5-s2",
            context: "You see different ways to help in your neighborhood. There is a food pantry, a local animal shelter, and a small youth center.",
            choices: [
              { text: "Give $100 equally to all three groups every month.", quality: "okay", xp: 300 },
              { text: "Volunteer a full day at a local group, but don't donate.", quality: "bad", xp: 100 },
              { text: "Give $25 to the food pantry and the youth center and volunteer at the local animal shelter monthly.", quality: "best", xp: 500 },
            ],
            justification: "Combining donations with volunteering is the best approach! Money donations let organizations buy exactly what they need most, whether it's medical supplies for a puppy or books for a student. And volunteering gives them your time and energy, which is often more valuable than just money! It's very important to physically interact with and help people you are donating to!",
          },
          {
            id: "swan-l5-s3",
            context: "You heard about a new charity organization that needs donations to help build a children's hospital in the neighborhood.",
            choices: [
              { text: "Give $600 all at once and volunteer monthly with the organization.", quality: "best", xp: 500 },
              { text: "Think many people would be donating anyways, so save money for other organizations.", quality: "bad", xp: 100 },
              { text: "Set up a small monthly donation of $50 from your savings and volunteer monthly.", quality: "okay", xp: 300 },
            ],
            justification: "Giving $600 all at once is like a \"Fast-Forward Button.\" For a big project like building a hospital, they often need a huge pile of cash right at the start to buy expensive things like X-ray machines or bricks. Adding monthly volunteering on top of that makes you a \"Most Valuable Provider\" because you gave them a giant head start and your ongoing help. The monthly $50 option is also great — it's the \"Steady Shield\" move that the hospital can rely on forever!",
          },
        ],
      },
    ],
  },
  {
    id: "beaver",
    name: "Beaver's Journey",
    guide: "beaver",
    description: "Follow Beaver from first job to business owner! Learn about earning, needs vs wants, saving, and loans.",
    unlockXP: 3000,
    levels: [
      {
        id: "beaver-l1",
        title: "Earning Income",
        topic: "Getting Your First Job",
        unlockXP: 0,
        scenarios: [
          {
            id: "beaver-l1-s1",
            context: "You just graduated from high school and want to get a job to start earning money on your own.",
            choices: [
              { text: "Work as a food delivery driver with flexible working hours but lower pay.", quality: "okay", xp: 300 },
              { text: "Work at a bakery that has a fixed weekly schedule and steady pay.", quality: "best", xp: 500 },
              { text: "Work as a physical advertiser for a restaurant. Fixed schedule, but earnings shift based on performance.", quality: "bad", xp: 100 },
            ],
            justification: "The Bakery is the best because it offers steady pay and a fixed schedule. For someone just starting out, having a predictable schedule is like having a sturdy foundation for a house; it helps you plan when you can study, rest, or see friends. The \"roller coaster\" of changing pay makes it very hard to know if you'll have enough money for rent next month.",
          },
          {
            id: "beaver-l1-s2",
            context: "After working 3 months, you realize that you need more money to save up for college. So what should you do next?",
            choices: [
              { text: "Work at another job as an online website manager at night after you finish work at the bakery.", quality: "bad", xp: 100 },
              { text: "Start doing online tutoring only during free hours.", quality: "best", xp: 500 },
              { text: "Stick with one job for now and wait for a promotion.", quality: "okay", xp: 300 },
            ],
            justification: "Online Tutoring is the smartest choice because it is flexible. Since you already work long hours at your first job, taking another full-shift job at night would make you so tired you might get sick or make mistakes. Tutoring during \"free hours\" allows you to earn extra money for college without burning out!",
          },
          {
            id: "beaver-l1-s3",
            context: "After working a few months, you need to decide on what method to get paid.",
            teaching: "When you work at a job, there are different ways your boss can give you your money! Direct Deposit is the most modern way — your boss tells the bank to send your pay straight into your bank account on payday, like magic! You don't have to do anything; the money just appears. A Paper Check is a special piece of paper your boss gives you. You take it to your bank (or use a phone app to snap a picture of it), and the bank puts that money into your account. It works, but you have to remember to actually go deposit it! Getting paid in Cash means your boss hands you real paper money and coins. It feels great to hold it, but there's a big problem: if you lose it or someone takes it, it's gone forever. Plus, it's really hard to keep track of how much you spent when everything is cash. That's why most grown-ups prefer direct deposit — it's safe, automatic, and easy to track!",
            choices: [
              { text: "Your pay goes by direct deposit into your bank account.", quality: "best", xp: 500 },
              { text: "Get a paper check and deposit it using a bank app.", quality: "okay", xp: 300 },
              { text: "Get paid in cash.", quality: "bad", xp: 100 },
            ],
            justification: "Direct Deposit is the gold standard because it is safe and automatic. The money goes straight into your bank account like a digital teleport, so you don't have to worry about losing a paper check or having cash stolen from your wallet. Plus, the money is ready to use immediately for bills, which helps you stay organized.",
          },
        ],
      },
      {
        id: "beaver-l2",
        title: "Needs vs. Wants",
        topic: "Spending Wisely",
        unlockXP: 1200,
        scenarios: [
          {
            id: "beaver-l2-s1",
            context: "You get your first paycheck and need to pay for your rent, food, taxes, clothes, etc. But your high school friend is asking to eat dinner at a fancy restaurant after months of not seeing each other.",
            choices: [
              { text: "Pay all your basic bills first. Realize you have no money left. Ask your friend to hang out at a cheaper restaurant.", quality: "best", xp: 500 },
              { text: "Pay for most of your needs, but buy used clothes instead of new ones to save money to meet your friend for dinner.", quality: "okay", xp: 300 },
              { text: "Meet your friend at the fancy restaurant and focus on your needs more in your next paycheck.", quality: "bad", xp: 100 },
            ],
            justification: "Both the first and second options are great! Paying every bill first and being honest with your friend is the \"Super Responsible\" move — protecting your life from any \"game over\" moments. The second option is the \"Creative Balance\" move — choosing used clothes unlocks extra money for dinner, showing you can be smart with shopping without missing out on fun.",
          },
          {
            id: "beaver-l2-s2",
            context: "You have $50 left after paying all your needs. You really want to treat yourself, but you can only pick one of the following:",
            choices: [
              { text: "Go to the movies with snacks and have fun for a night.", quality: "okay", xp: 300 },
              { text: "Buy flowers for your mom as Mother's Day is coming up.", quality: "best", xp: 500 },
              { text: "Buy a PS5, but pay more than the budget, so you have to adjust next week's needs and wants.", quality: "bad", xp: 100 },
            ],
            justification: "Flowers for Mom is the winner because it is a meaningful \"want.\" While movies are fun, using your extra money to show love to your family builds strong relationships, which are more valuable than a two-hour film. Buying a PS5 you can't afford creates a \"money emergency\" for your food and rent next week.",
          },
          {
            id: "beaver-l2-s3",
            context: "Your old laptop, which you use to manage your work, has started freezing and shutting down randomly. At the same time, your phone's screen is cracked, making it hard to read texts, but it still works. You have enough saved for one upgrade.",
            choices: [
              { text: "Buy a high-end Gaming MacBook using a payment plan.", quality: "bad", xp: 100 },
              { text: "Buy the newest iPhone and a cheap laptop repair kit.", quality: "okay", xp: 300 },
              { text: "Buy a mid-range, reliable laptop to replace your old one.", quality: "best", xp: 500 },
            ],
            justification: "The Mid-range Laptop is the smartest move. Since you use your laptop for work, a working computer is a \"Need.\" A phone with a cracked screen is annoying, but if it still works, it's a \"Want.\" Getting a reliable, affordable laptop ensures your job stays safe without wasting money on a Gaming MacBook that has fancy features you don't actually need for baking.",
          },
        ],
      },
      {
        id: "beaver-l3",
        title: "Savings",
        topic: "Saving Smart on Any Income",
        unlockXP: 2500,
        scenarios: [
          {
            id: "beaver-l3-s1",
            context: "You are looking at your monthly expenses along with your salary and need to adjust how you are going to prioritize needs, wants, and savings.",
            teaching: "When you don't earn a lot of money, every dollar matters even more! Think of your money like a glass of water on a hot day — you wouldn't waste it by splashing it around, right? You'd drink what you need first to stay healthy. That's exactly how it works with money. \"Needs\" are things you absolutely must pay for to survive and stay safe, like rent (so you have a roof over your head), food (so you don't go hungry), and transportation (so you can get to work). \"Wants\" are fun things like video games, eating out, or new sneakers — they're nice to have but you won't be in danger without them. When your income is low, the smartest move is to cover all your needs first, save a little bit for emergencies, and only then spend whatever tiny amount is left on wants.",
            choices: [
              { text: "Prioritize needs and focus on savings with the rest of your money by using a 65/15/20 split.", quality: "best", xp: 500 },
              { text: "Prioritize needs but put wants and savings at an equal rate by using a 55/25/20 split.", quality: "okay", xp: 300 },
              { text: "Prioritize needs but spend more on fun than savings by using a 65/20/15 split.", quality: "bad", xp: 100 },
            ],
            justification: "The 65/15/20 split is the \"Champion's Split.\" By putting 20% into savings, you're building a \"Safety Net\" faster. When you have a lower income, having that extra cushion is super important because one small emergency could be a big problem. This plan makes sure your needs are met first, but your future is also very well-protected.",
          },
          {
            id: "beaver-l3-s2",
            context: "It's getting colder, and you need to buy a jacket to keep you warm throughout the winter, but you have a limited budget.",
            choices: [
              { text: "Wait to buy an expensive, high-quality jacket that lasts long.", quality: "okay", xp: 300 },
              { text: "Buy a cheaper jacket for this winter that is still warm and convenient.", quality: "bad", xp: 100 },
              { text: "Use a bit of savings to buy a jacket that will likely last two winters.", quality: "best", xp: 500 },
            ],
            justification: "This balances quality and cost. Buying a jacket that lasts two winters means you are spending a little more than the cheapest one, but you won't have to buy another one next year. It's a \"Smart Save\" because it keeps you warm now and protects your wallet for the next two years!",
          },
          {
            id: "beaver-l3-s3",
            context: "You want to save for a car that makes the transition from your home to work faster and easier.",
            teaching: "Here's a money trick that rich and successful people use: the \"Pay Yourself First\" rule! It means that the very first thing you do when you get paid is move some money into your savings — before you buy anything, before you pay for fun stuff, before you even think about spending. Why? Because if you wait until the end of the month to save \"whatever is left,\" guess what usually happens? There's nothing left! It all got spent on little things here and there. But if you save first — say 15% of every paycheck — that money is already safe and growing before you can accidentally spend it. It's like hiding your Halloween candy in a secret spot before you're tempted to eat it all in one night!",
            choices: [
              { text: "Make a plan to consistently save 15% of income, even if it means cutting back on non-essential spending.", quality: "best", xp: 500 },
              { text: "Make a plan to consistently save 5% of income, and enjoy the small wants.", quality: "okay", xp: 300 },
              { text: "Decide to save how much is left after every month's expenses are made.", quality: "bad", xp: 100 },
            ],
            justification: "Save 15% consistently is the winner because it uses the \"Pay Yourself First\" rule. By deciding to save 15% before spending on fun, you guarantee that your car fund will grow every single month. If you only save \"whatever is left,\" you might find that there is $0 left because small treats added up too fast!",
          },
        ],
      },
      {
        id: "beaver-l4",
        title: "Loans",
        topic: "Borrowing Wisely",
        unlockXP: 4000,
        scenarios: [
          {
            id: "beaver-l4-s1",
            context: "You have a small emergency — your bicycle broke down and you need it to get to work every day. Repair costs are too expensive to pay right now.",
            choices: [
              { text: "Use your emergency savings to pay for the repair right away.", quality: "best", xp: 500 },
              { text: "Ask a friend to lend you the money and pay them back next month.", quality: "okay", xp: 300 },
              { text: "Put the repair on a credit card and pay the minimum each month.", quality: "bad", xp: 100 },
            ],
            justification: "Using your emergency savings is exactly what it was built for! This is why we build a \"Safety Net\" — so when small emergencies pop up, you can handle them without going into debt. Credit card minimum payments pile up interest quickly, which can turn a small problem into a big one.",
          },
          {
            id: "beaver-l4-s2",
            context: "You remember the car you saw earlier, and think about buying it to help you move from place to place, but you don't have enough money saved.",
            choices: [
              { text: "Ask three friends to equally lend you some money. Pay them back in the next few months.", quality: "bad", xp: 100 },
              { text: "Use a store installment plan that allows you to pay back predictable amounts over the next few months without a loan.", quality: "best", xp: 500 },
              { text: "Get a loan from the bank that has interest but is safe and protected.", quality: "okay", xp: 300 },
            ],
            justification: "A store installment plan is the \"Predictable Path.\" It usually doesn't involve a scary bank. You know exactly how much you owe every month, and it feels like a small step-by-step ladder to owning a car. A bank loan is also a solid choice — it's the \"Shield of Protection\" because banks have clear rules and contracts that protect you, and it helps you build a \"credit score\" like gaining XP for your financial life!",
          },
          {
            id: "beaver-l4-s3",
            context: "Your home suffers from a fire and requires repair quickly. The cost is too high to cover currently.",
            choices: [
              { text: "Apply for a bank emergency loan or personal loan with structured repayment.", quality: "best", xp: 500 },
              { text: "Ask close family and friends to cover the costs for now.", quality: "okay", xp: 300 },
              { text: "Use multiple credit cards and small loans to piece together the funds.", quality: "bad", xp: 100 },
            ],
            justification: "A Bank Emergency Loan is the winner here. A house fire is a huge emergency, and you need a \"Structured Plan.\" A bank loan gives you a clear map of exactly how much to pay each month for several years. Trying to use multiple credit cards is like trying to juggle fire—the high interest rates will grow so fast that you might never be able to pay it all back.",
          },
        ],
      },
    ],
  },
  {
    id: "dog",
    name: "Dog's Journey",
    guide: "dog",
    description: "Join Dog as a business owner! Master loans, savings, budgeting, investing, and community giving with your snack business.",
    unlockXP: 8000,
    levels: [
      {
        id: "dog-l1",
        title: "Loans",
        topic: "Business Loans & Interest",
        unlockXP: 0,
        scenarios: [
          {
            id: "dog-l1-s1",
            context: "You want to start your snack-making business but need money to pay for ingredients, equipment, permits, workers, etc. You need to decide how to get the initial funds.",
            teaching: "Starting a business costs money — you need to buy ingredients, equipment, and pay for permits before you've even sold your first item! But what if you don't have enough money saved up? That's where a loan comes in. A loan is when a bank (or sometimes a person) lets you borrow their money so you can get started right away. But here's the catch: you don't just pay back what you borrowed — you also pay a little extra called \"interest.\" Interest is like a thank-you fee for letting you use their money. For example, if you borrow $1,000 with 10% interest, you'd pay back $1,100 total — the original $1,000 plus $100 extra. The lower the interest rate, the less extra you have to pay, which means more money stays in your pocket!",
            choices: [
              { text: "Personal loan from a bank that has a higher interest rate than other options.", quality: "bad", xp: 100 },
              { text: "Business loan from a bank with a separate program for new business owners and a structured repayment plan.", quality: "best", xp: 500 },
              { text: "Informal loan from a rich family member who seems flexible about interest.", quality: "okay", xp: 300 },
            ],
            justification: "A Business Loan is the gold standard. Unlike a personal loan, which can have scary high interest, business loans are designed specifically for people like you. They give you a \"structured repayment plan,\" which is like a map that tells you exactly how much to pay back each month. This helps you stay organized so you don't get lost in debt!",
          },
          {
            id: "dog-l1-s2",
            context: "You want to expand your snack business and buy a bigger oven. You consider whether to take a loan or not.",
            teaching: "Taking out too many loans is like carrying too many heavy backpacks at once — eventually, they weigh you down so much that you can barely move! Every loan you take means you owe money plus interest, and all those payments add up. Sometimes, the smartest thing to do is wait and use your own savings instead. When you use money you've already saved, you don't owe anyone anything — no interest, no monthly payments, no stress! It might take longer to save up, but the money you earn is 100% yours. Think of it this way: would you rather borrow a friend's toy and have to give it back plus one of your own toys, or just wait until you can buy your own toy and keep it forever?",
            choices: [
              { text: "Take a bank business loan with a structured repayment plan.", quality: "okay", xp: 300 },
              { text: "Don't take a loan, but grow using savings.", quality: "best", xp: 500 },
              { text: "Take a small, informal loan from a friend.", quality: "bad", xp: 100 },
            ],
            justification: "Using Savings is a very smart move if you can afford it. When you use your own savings, you don't have to pay interest (that extra money you pay back to the bank). Every penny you earn stays in your pocket! A bank business loan is also a good choice if your savings are too small, because it helps you grow faster using a safe, professional plan.",
          },
          {
            id: "dog-l1-s3",
            context: "Let's check your understanding of loans!",
            isQuiz: true,
            choices: [],
            justification: "",
            questions: [
              {
                text: "What are loans?",
                choices: [
                  { text: "Money earned from running a business.", quality: "bad", xp: 100 },
                  { text: "Money borrowed that must be repaid with extra cost.", quality: "best", xp: 500 },
                  { text: "Money borrowed that does not need to be repaid with extra cost.", quality: "bad", xp: 100 },
                ],
                justification: "That \"extra cost\" is the price of using someone else's money.",
              },
              {
                text: "What is the interest rate for a loan?",
                choices: [
                  { text: "A cost you must pay the bank for holding your money.", quality: "bad", xp: 100 },
                  { text: "A discount for paying early.", quality: "bad", xp: 100 },
                  { text: "Extra money you pay for borrowing money.", quality: "best", xp: 500 },
                ],
                justification: "It's like a \"rental fee\" for the money you borrowed.",
              },
              {
                text: "For a loan, is a high or low interest rate better?",
                choices: [
                  { text: "High interest is better.", quality: "bad", xp: 100 },
                  { text: "Low interest is better.", quality: "best", xp: 500 },
                  { text: "It doesn't matter.", quality: "bad", xp: 100 },
                ],
                justification: "You want to pay back as little \"extra\" as possible!",
              },
            ],
          },
        ],
      },
      {
        id: "dog-l2",
        title: "Savings",
        topic: "Saving with a Business",
        unlockXP: 1200,
        scenarios: [
          {
            id: "dog-l2-s1",
            context: "You are making money from your snack business, and are planning how to save your money.",
            choices: [
              { text: "Prioritize needs, then pay more than the minimum loan repayment to pay it off early. Focus less on wants and saving.", quality: "best", xp: 500 },
              { text: "Prioritize needs, then savings, and keep loan repayment for future months.", quality: "bad", xp: 100 },
              { text: "Pay for basic needs first, set aside savings for emergencies, and make only the minimum required loan payment.", quality: "okay", xp: 300 },
            ],
            justification: "Paying more than the minimum on your loan is an excellent strategy because it focuses on freeing debt. By paying more, you are \"killing\" the interest before it has a chance to grow. It's like running a race and sprinting at the beginning so you can finish sooner. Once that loan is gone, all the money you earn belongs to you!",
          },
          {
            id: "dog-l2-s2",
            context: "You see that you don't wear some of your old clothing, and decide to sell them. You get some cash from this sale and consider what you're gonna do with it.",
            choices: [
              { text: "Buy some new clothes now that you've sold some of your old clothes.", quality: "bad", xp: 100 },
              { text: "Use most of the cash to make an extra loan payment, lowering the total interest you'll pay over time.", quality: "best", xp: 500 },
              { text: "Use the cash to buy small but useful supplies or tools that help your snack business run more efficiently.", quality: "okay", xp: 300 },
            ],
            justification: "Both paying down your loan and buying business tools are winners! Using extra cash to pay down your loan is like \"buying back\" your future freedom because it lowers your total interest. But using it for better tools, like a faster mixer, is also great because it helps you make more snacks and earn more money. Both choices help your business grow stronger!",
          },
          {
            id: "dog-l2-s3",
            context: "Let's check your understanding of savings!",
            isQuiz: true,
            choices: [],
            justification: "",
            questions: [
              {
                text: "What are savings?",
                choices: [
                  { text: "Savings is money you set aside for future needs or emergencies.", quality: "best", xp: 500 },
                  { text: "Savings is extra money you keep for needs and wants.", quality: "okay", xp: 300 },
                  { text: "Savings are for paying interest on loans.", quality: "bad", xp: 100 },
                ],
                justification: "It's your \"Safety Shield\" for surprises you can't expect.",
              },
              {
                text: "What should be prioritized most?",
                choices: [
                  { text: "Wants.", quality: "bad", xp: 100 },
                  { text: "Savings.", quality: "okay", xp: 300 },
                  { text: "Needs.", quality: "best", xp: 500 },
                ],
                justification: "You must pay for food and rent before anything else!",
              },
              {
                text: "How do savings change when you have a loan to pay off?",
                choices: [
                  { text: "Savings should stop completely until the loan is fully paid off.", quality: "bad", xp: 100 },
                  { text: "Savings usually decrease, but keeping some savings is still important to avoid future emergencies.", quality: "best", xp: 500 },
                  { text: "Savings should increase because loans make saving unnecessary.", quality: "bad", xp: 100 },
                ],
                justification: "Keeping some savings while paying off a loan is essential because it serves as your \"emergency shield.\"",
              },
            ],
          },
        ],
      },
      {
        id: "dog-l3",
        title: "Budgeting",
        topic: "Budgeting for Business",
        unlockXP: 2500,
        scenarios: [
          {
            id: "dog-l3-s1",
            context: "Your income changes every month. In months your snack business does well, you have high income, but in months your business doesn't do well your income barely meets your needs.",
            choices: [
              { text: "Budget using your average monthly income and adjust spending on wants depending on how much money comes in.", quality: "okay", xp: 300 },
              { text: "Don't set a fixed budget but make careful spending decisions each month based on business performance.", quality: "bad", xp: 100 },
              { text: "Base your budget on your lowest-income months, covering needs and loan payments first, and save extra during higher-income months.", quality: "best", xp: 500 },
            ],
            justification: "Budgeting based on your lowest-income months is the safest approach. This way, you can always cover your \"needs\" and loan payments even when income is slow. During good months, you get to save the extra money as a bonus!",
          },
          {
            id: "dog-l3-s2",
            context: "One month, a piece of your snack-producing equipment breaks and needs to be fixed, costing more than you expected. You need to pay for the repair quickly.",
            choices: [
              { text: "Reduce spending on wants for the month and delay saving until the repair is paid for.", quality: "best", xp: 500 },
              { text: "Use your emergency savings and adjust your budget for the next month to rebuild it.", quality: "okay", xp: 300 },
              { text: "Pay for the repair and go with your original budget for the next month.", quality: "bad", xp: 100 },
            ],
            justification: "Both reducing wants and using emergency savings are winners! Sacrificing \"wants\" to pay the bill keeps your savings safe for an even bigger emergency later. Using your \"Emergency Shield\" is also perfect — that's exactly what it was built for! Just remember to refill those savings next month.",
          },
          {
            id: "dog-l3-s3",
            context: "Let's check your understanding of budgeting!",
            isQuiz: true,
            choices: [],
            justification: "",
            questions: [
              {
                text: "When your income changes from month to month, which budgeting approach is generally the safest?",
                choices: [
                  { text: "Budget based on your highest-income months so you can enjoy good months more.", quality: "bad", xp: 100 },
                  { text: "Budget based on your lowest-income months and save extra money during better months.", quality: "best", xp: 500 },
                  { text: "Avoid budgeting until income becomes stable.", quality: "bad", xp: 100 },
                ],
                justification: "Based on your lowest-income months, you can always cover your \"needs\" and loan payments even when income is slow.",
              },
              {
                text: "You earn more than expected this month. What is the most responsible way to handle your budget?",
                choices: [
                  { text: "Keep spending habits the same and treat the extra money as free spending cash.", quality: "bad", xp: 100 },
                  { text: "Ignore the budget for this month since it was already planned.", quality: "bad", xp: 100 },
                  { text: "Update your budget to decide in advance how much goes to savings, loan payments, and wants.", quality: "best", xp: 500 },
                ],
                justification: "You can strategically use that extra cash for things like faster loan repayment or emergency savings before you're tempted to spend it all on \"wants.\"",
              },
            ],
          },
        ],
      },
      {
        id: "dog-l4",
        title: "Investing",
        topic: "Investing in Your Business",
        unlockXP: 4000,
        scenarios: [
          {
            id: "dog-l4-s1",
            context: "Your snack business is getting busier and gaining more orders, but slow preparation is limiting how many customers you can serve.",
            teaching: "When most people hear \"investing,\" they think of stocks and the stock market. But investing is actually much bigger than that! Investing simply means spending money on something today that will help you make even more money in the future. For example, if you buy a better oven for your bakery, you can bake twice as many cookies in the same amount of time — that means more cookies to sell and more money earned! That oven was an investment. If you take a class to learn a new skill, that's also an investment — in yourself! Even buying a good pair of work shoes so your feet don't hurt and you can work longer is a kind of investment. The key question to ask yourself is: \"Will spending this money now help me earn more money later?\" If the answer is yes, it might be a smart investment!",
            choices: [
              { text: "Keep using your current setup and focus on working longer hours instead.", quality: "bad", xp: 100 },
              { text: "Repair your existing equipment to extend its life and save money for now.", quality: "okay", xp: 300 },
              { text: "Invest in new equipment that speeds up production and reduces waste.", quality: "best", xp: 500 },
            ],
            justification: "New Equipment is the best long-term play. Working longer hours just makes you tired, but a machine that speeds up production is like a \"Level Up\" for your kitchen. It allows you to serve more customers in less time, which is the smartest way to multiply your money.",
          },
          {
            id: "dog-l4-s2",
            context: "Sales have been steady, and you have a small surplus after paying expenses and loan payments. You want to decide how to use this money to strengthen the company.",
            teaching: "In business, there are two ways to invest your extra money. Short-term investing is like a sprint — you spend money on something hoping it will pay off quickly, maybe in a few weeks or months. For example, running a special ad campaign for a holiday sale. It might bring in quick cash, but the results don't always last. Long-term investing is like planting a garden — you spend money on things that take a while to pay off but keep giving you rewards for years and years. For example, buying better equipment or training your workers to be more skilled. At first it feels like nothing is happening, but over time your business gets stronger, faster, and more profitable. Most successful business owners focus more on long-term investments because they build something that lasts!",
            choices: [
              { text: "Invest in basic marketing, like setting up social media ads or local promotions.", quality: "best", xp: 500 },
              { text: "Invest in improving supply efficiency, such as buying ingredients in bulk to lower costs per unit.", quality: "best", xp: 500 },
              { text: "Keep the money as cash to maintain flexibility in case of future expenses for the business.", quality: "okay", xp: 300 },
            ],
            justification: "Both marketing and bulk buying are the best because they represent \"growth\" versus \"efficiency.\" Marketing plants seeds to bring in more customers and grow your total sales. Buying in bulk lowers your costs, meaning you make more profit on every single snack. Whether you choose to bring in more people or make your process cheaper, both choices help your business \"Level Up\"!",
          },
          {
            id: "dog-l4-s3",
            context: "Let's check your understanding of investing!",
            isQuiz: true,
            choices: [],
            justification: "",
            questions: [
              {
                text: "Which investment is most likely to improve a company's long-term financial health?",
                choices: [
                  { text: "Investing in things that reduce costs or increase efficiency over time.", quality: "best", xp: 500 },
                  { text: "Spending extra money quickly so it doesn't sit unused.", quality: "bad", xp: 100 },
                  { text: "Avoiding all investments to eliminate risk.", quality: "bad", xp: 100 },
                ],
                justification: "This makes your business more profitable every single day by lowering your expenses and saving you time.",
              },
              {
                text: "Which factor matters most when deciding whether an investment is worth making?",
                choices: [
                  { text: "Whether the investment looks impressive to others.", quality: "bad", xp: 100 },
                  { text: "Whether the investment can help the business earn more or spend less in the future.", quality: "best", xp: 500 },
                  { text: "Whether the investment uses all available cash.", quality: "bad", xp: 100 },
                ],
                justification: "This ensures your money is actually working to grow your business rather than just disappearing.",
              },
              {
                text: "Is it better to invest in stocks or your own business (if you have one)?",
                choices: [
                  { text: "It is better to invest in stocks because it is more stable.", quality: "okay", xp: 300 },
                  { text: "It is better to invest in your business because it is more flexible.", quality: "okay", xp: 300 },
                  { text: "Investing in your business, mostly along with some stock investment, is a good balance.", quality: "best", xp: 500 },
                ],
                justification: "Balancing is always best to ensure growth while limiting risks.",
              },
            ],
          },
        ],
      },
      {
        id: "dog-l5",
        title: "Donations & Charity",
        topic: "Giving Back as a Business",
        unlockXP: 5500,
        scenarios: [
          {
            id: "dog-l5-s1",
            context: "You always have some leftover snacks that are unsold and want to do something with them instead of throwing them away or taking them home.",
            choices: [
              { text: "As you leave work every night, visit the local children's shelter to donate the snacks.", quality: "best", xp: 500 },
              { text: "Take money out of the profits of the company and donate it to a local children's center.", quality: "okay", xp: 300 },
              { text: "Give them to your workers to eat at home.", quality: "bad", xp: 100 },
            ],
            justification: "Both donating snacks and donating money are great because they show \"Generosity\" in two different ways! Donating snacks makes sure delicious food doesn't go to waste and puts smiles on children's faces. Donating profits gives the children's center \"buying power\" to pay for things they need most, like new beds or medical care. Both choices build a strong bond between your business and the community!",
          },
          {
            id: "dog-l5-s2",
            context: "A local school asks if you can provide snacks for a community event. They are requesting a lower price because it is for a community event.",
            choices: [
              { text: "Provide the snacks for the original price because selling at a lower price is risky for the business.", quality: "okay", xp: 300 },
              { text: "Provide the snacks for a lower price as requested and decide to donate monthly snacks to the school.", quality: "bad", xp: 100 },
              { text: "Offer a discounted price for this one event only, making sure the cost still fits within your budget.", quality: "best", xp: 500 },
            ],
            justification: "The \"Perfect Balance\" — you want to be generous to the school, but you also have to make sure your business doesn't lose money. By offering a discount for just this one event, you help the community while keeping your own \"Money Ship\" floating safely. It proves you are both kind and a very smart business owner!",
          },
          {
            id: "dog-l5-s3",
            context: "Let's check your understanding of charity and business!",
            isQuiz: true,
            choices: [],
            justification: "",
            questions: [
              {
                text: "What makes giving snacks away a good decision for a small business?",
                choices: [
                  { text: "It is a safe and planned way to help the community without hurting the business, and you may get tax benefits.", quality: "best", xp: 500 },
                  { text: "It gathers more consumers.", quality: "okay", xp: 300 },
                  { text: "It replaces the need to manage finances carefully.", quality: "bad", xp: 100 },
                ],
                justification: "Giving back helps your neighbors and reduces waste, while potentially earning tax benefits that keep your business healthy.",
              },
              {
                text: "What is the main purpose of a business?",
                choices: [
                  { text: "To make money to share with workers.", quality: "okay", xp: 300 },
                  { text: "To provide goods or services people need while supporting employees and the community.", quality: "best", xp: 500 },
                  { text: "To compete with other businesses.", quality: "bad", xp: 100 },
                ],
                justification: "A business should provide helpful goods or services while creating a positive circle of support for your employees, your customers, and your entire community.",
              },
            ],
            teaching: "Giving back is important in business because it helps the community and builds trust with customers. Responsible generosity can strengthen a business's reputation while still keeping it financially sustainable.",
          },
        ],
      },
    ],
  },
];

export function getCategoryById(id: string): Category | undefined {
  return categories.find((c) => c.id === id);
}

export function getLevelById(levelId: string): { category: Category; level: Level } | undefined {
  for (const cat of categories) {
    const level = cat.levels.find((l) => l.id === levelId);
    if (level) return { category: cat, level };
  }
  return undefined;
}

export function getNextLevel(levelId: string): { category: Category; level: Level } | undefined {
  for (const cat of categories) {
    const idx = cat.levels.findIndex((l) => l.id === levelId);
    if (idx !== -1 && idx < cat.levels.length - 1) {
      return { category: cat, level: cat.levels[idx + 1] };
    }
  }
  return undefined;
}

export function getNextCategory(levelId: string): { category: Category; level: Level } | undefined {
  for (let i = 0; i < categories.length; i++) {
    const cat = categories[i];
    const idx = cat.levels.findIndex((l) => l.id === levelId);
    if (idx !== -1 && idx === cat.levels.length - 1 && i < categories.length - 1) {
      const nextCat = categories[i + 1];
      return { category: nextCat, level: nextCat.levels[0] };
    }
  }
  return undefined;
}
