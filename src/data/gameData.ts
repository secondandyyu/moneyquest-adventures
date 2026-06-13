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
            justification: "The best choice is Bank 2 because it is both convenient and rewarding! Having a mobile banking app makes sending and receiving money much easier because you don't have to physically travel to a bank to make transactions. Also, earning travel points for using your credit/debit card is like hitting two birds with one stone! It's also wise to avoid the monthly fee at Bank 3, as small fees can add up to be burdening over years.",
          },
          {
            id: "swan-l1-s2",
            context: "You need to decide which accounts to set up with your bank. A checking account allows you to make day-to-day spending and a savings account helps you save for the future.",
            teaching: "A checking account is for daily use, such as buying food or clothes. It is connected to a credit/debit card that you can use at stores to easily transfer money from your account to the store's. On the other hand, a savings account is for long-term use (to \"save\" money for the future). A savings account grows through \"interest,\" which is extra money banks give you for storing your money with them. Banks invest your money while you don't use it, and give you extra money as a \"thank you for letting us use your money!\"",
            choices: [
              { text: "Open both a checking and a savings account, putting most money in checking for daily use.", quality: "okay", xp: 300 },
              { text: "Open both a checking and a savings account, splitting your money wisely between daily spending and saving for the future.", quality: "best", xp: 500 },
              { text: "Open only a checking account since you need money available all the time.", quality: "bad", xp: 100 },
            ],
            justification: "Opening both a checking and savings account is the wisest move! It's important to give yourself money for daily spending, but also save for the future. Only having a checking account means you can't get interest (the extra money banks give you)! Also, if you split your money too unevenly, you're gonna run out of usable money at some point!",
          },
          {
            id: "swan-l1-s3",
            context: "You need to make withdrawals to pay for rent, groceries, and new clothes.",
            teaching: "There are three main way to get money out of your bank account: ATMs, mobile wiring, and checks. An ATM is a physical machine (typically outside a bank or store) that gives you paper money once you put your card in it. It's perfect for when you need cash! Mobile wiring is like sending money digitally. It essentially \"teleports\" money from place to place, without any cash actually being touched. It's super fast and simple, and common in our digital world. A paper check is a traditional way you use when you want to give someone money. You write someone's name on a special piece of paper, and when they take this paper to the bank, the bank takes money from your bank account and gives it to that person!",
            choices: [
              { text: "Use ATMs mostly for immediate transactions for quick or emergency purchases. Use mobile wire for online transfers and rent payment.", quality: "best", xp: 500 },
              { text: "Pay rent with a check, groceries and other payments via wiring.", quality: "okay", xp: 300 },
              { text: "Pay rent with cash through an ATM and keep a large amount of cash in your wallet.", quality: "bad", xp: 100 },
            ],
            justification: "It's crucial to use different methods for different purposes! Using an ATM for immediate cash is great for small things, and using a mobile wire transfer for quick, online transfers is convenient. Carrying too much cash is dangerous because if you lose your wallet, you also lose all that money. Using the right digital tools keeps your money safe and easily manageable.",
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
            justification: "Following the basic 70/15/15 rule is safe because you allocate enough money to fill your daily needs like rent, groceries, transportation, and taxes. 15% for \"wants\" gives yourself room to have some fun, or eat out with friends. The last 15% gives you just enough money to save for your future. It's important to prioritize your needs first, and save a small amount for things you want but don't need, and for your future expenses.",
          },
          {
            id: "swan-l2-s2",
            context: "One day, your old tote bag tears as you travel to work, and now you need to pick a new bag that balances price, quality, and long-term value.",
            choices: [
              { text: "Buy a cheap bag using your savings. The bag only lasts a couple months and you'll need another one later.", quality: "bad", xp: 100 },
              { text: "Save up for the next month to buy a more expensive bag that fits the current trends. It isn't super durable but is pretty.", quality: "okay", xp: 300 },
              { text: "Save up for the next month to buy an expensive but high quality bag that will last long. It isn't the prettiest but gets its job done best.", quality: "best", xp: 500 },
            ],
            justification: "Choosing the expensive but high quality bag is the best move because you only have to buy it once, and it will last much longer than other bags. If you constantly buy cheap bags as one tears after another, you end up spending more money over time! It's better to save up for one high-quality bag than buy five low-quality bags!",
          },
          {
            id: "swan-l2-s3",
            context: "You realize you need a computer for work now, but you also want to buy a home in the future. You need a savings plan that handles both goals.",
            choices: [
              { text: "Save 15% of your income monthly and prioritize the computer first for work, then increase savings over time for the house.", quality: "best", xp: 500 },
              { text: "Save 15% of your income monthly and prioritize the house first, then the computer.", quality: "okay", xp: 300 },
              { text: "Save 10% of your income monthly for each goal at the same time.", quality: "bad", xp: 100 },
            ],
            justification: "Saving for the computer first, then the house is the best strategy! Always prioritize smaller goals first, and save what's left for a bigger goal, like buying a house. By getting the computer first, you also get work done faster, and allow yourself to reach your bigger goal faster. Trying to save for both goals at once makes progress feel so slow that you might get frustrated and quit. Finishing one small goal first gives you the momentum to continue!",
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
            justification: "When managing money, it's important to keep everything all in one place, so that you don't confuse yourself and lose track of things. Noting expected monthly income and expenses in one notebook helps you make a plan on how you are going to spend or save money for the month. Keeping sticky notes all over your home gets messy, and ignoring small daily spending can ultimately add up to affect your financial status.",
          },
          {
            id: "swan-l3-s2",
            context: "Your desk is covered in receipts and messy notes, so you want to switch to a cleaner digital method for tracking money.",
            choices: [
              { text: "Create an online spreadsheet with categories (rent, food, transport, savings, fun) and update it weekly.", quality: "best", xp: 500 },
              { text: "Use an online spreadsheet and update it monthly.", quality: "okay", xp: 300 },
              { text: "Continue to write down your income and expenses on your physical notebook weekly, as you already have a comfortable setup.", quality: "bad", xp: 100 },
            ],
            justification: "Using an online spreadsheet is like having a robot assistant who calculates everything for you! Updating it weekly, not monthly, helps you stay up to date with your income and expenses, and not fall behind. Also, by using an online spreadsheet, you never have to worry about losing papers or information because everything is securely stored in one place!",
          },
          {
            id: "swan-l3-s3",
            context: "A coworker shows you the MoneyCare app and explains how it can link to your bank to track expenses automatically.",
            teaching: "Wouldn't it be easy if an app could take care of all your money without you having to worry about it? That's basically what a budgeting app like MoneyCare does! Budgeting apps help you make smart money choices by sorting your spending into groups like \"Food,\" \"Fun,\" and \"Transportation\" automatically, so you know exactly where your money goes each month, and if you need to spend less in certain things.",
            choices: [
              { text: "Use MoneyCare to manually track your records. Don't connect the app to your bank account.", quality: "okay", xp: 300 },
              { text: "Use MoneyCare to categorize all of your planned income and expenses. The app will also will track all spending and saving with the bank account connection.", quality: "best", xp: 500 },
              { text: "Use MoneyCare to track your card expenses and keep other things (income, savings, etc.) in your physical notebook.", quality: "bad", xp: 100 },
            ],
            justification: "Using MoneyCare to categorize your income and expenses is the best choice. When the app connects to your bank account, it can automatically sort your income and spending, preventing human error and time. You can easily track your financial status and make changes to your spending habits as necessary!",
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
            teaching: "When you buy a \"stock,\" you're basically buying a small piece of a big company like Apple or Samsung. If you own 1% of Apple's stock, you basically own 1% of Apple. And when Apple earns more money, your 1% becomes more valuable. However, if people stop buying Apple's products, Apple loses money and your 1% becomes less valuable. To avoid the risk of losing money, smart investors don't just invest in one company, but in many companies so that if one company does poorly, you don't lose that much money. This is called \"diversification,\" as you diversify the companies you invest in. This means that even if one company fails, you still have other companies that are doing great.",
            choices: [
              { text: "Invest in \"Stylist,\" a clothing company that makes trendy clothes. Sometimes popular, sometimes not. High growth in the past but stagnant recently.", quality: "bad", xp: 100 },
              { text: "Invest in \"TechKnowlegy,\" a tech company making computers and cars. Some people buy from them as an alternative to other tech giants. Ups and downs in growth.", quality: "okay", xp: 300 },
              { text: "Invest in \"Sunny Snacks Co.,\" a food company most people use for groceries and snacks. They deliver items for convenience. Steady growth for the past three years.", quality: "best", xp: 500 },
            ],
            justification: "Sunny Snacks Co. is the safest and smartest choice. While tech companies are cool, they can be like a roller coaster: up one day and down the next. However, people always need to eat, no matter what is happening in the world. Investing in a food company that is growing steadily is much safer than investing in companies that have volatile performances. To be safe, you always want to invest in a company that has steady growth rather than a company that performs without much pattern.",
          },
          {
            id: "swan-l4-s2",
            context: "You consider what would happen if you tried short-term investing vs. long-term investing. The two main types of investing are fundamentally different in both time and goals. Short-term investing is on a shorter period and good for quick gains while long-term investing is over a longer period of time and for general wealth-building and compounding growth. Short-term investing can be risky due the pursuit of quick money, while long-term investing can feel slow and requires patience.",
            teaching: "Investing is simply making money grow on its own. You invest your money in different areas so that it can grow and multiply. The two main types of investing are fundamentally different in both time and goals. Short-term investing is on a shorter period and good for quick gains while long-term investing is over a longer period of time and for general wealth-building and compounding growth. Short-term investing can be risky due to a desire for quick money, and long-term investing can feel slow and requires patience.",
            choices: [
              { text: "Invest mostly short-term to increase immediate benefits, no matter the riskiness.", quality: "bad", xp: 100 },
              { text: "Invest long-term in stable companies and let your money grow over years.", quality: "best", xp: 500 },
              { text: "Mix short-term and long-term, but lean toward short-term for more excitement.", quality: "okay", xp: 300 },
            ],
            justification: "Long-term investing is the winner for most people. For beginners like us, short-term investing can only be risky and stressful because it requires precise predictions and adapting to market trends. Purchasing stock of a company that you think will perform well this month may backfire due to factors you cannot predict, while purchasing stock of a company that you think will grow over ten years gives the company time to grow and compound wealth. While no investment is a guarantee, long-term investing generally offers a higher chance of steady wealth creation.",
          },
          {
            id: "swan-l4-s3",
            context: "You worked another month and gained some extra money. You want this money to grow, so you decide to invest it. What's the best way to invest in this situation?",
            teaching: "There are many different way to invest your money! First, a Mutual Fund is like hiring a really smart person to pick the best investments for you. They put your money (along with other people's money) into the best investments. You pay them a small fee for managing your money. An Index Fund is similar, but instead of a person choosing, a computer automatically buys stocks from a list of the biggest and most popular companies (like the top 500 companies in America!). They are generally cheaper than mutual funds as it is managed passively! Crypto (or cryptocurrency) is like digital coins that exist only on computers. The most famous example is Bitcoin. No bank or government controls it, so its value goes up and down quite unpredictably. Crypto should be invested with money that you're okay with losing!",
            choices: [
              { text: "Put money only in index funds.", quality: "okay", xp: 300 },
              { text: "Put 40% in mutual funds, 50% in index funds, and 10% in crypto.", quality: "best", xp: 500 },
              { text: "Put 70% in crypto and 30% in index funds.", quality: "bad", xp: 100 },
            ],
            justification: "Splitting in the 40/50/10 ratio is the best choice because it uses diversification. By putting most money in mutual funds and index funds, it's low risk, but you also save 10% for Crypto for some upside. This way, you aren't putting all your eggs in one basket. If the value of Crypto drops, you only lose a small portion. Balance is the key to smart investing!",
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
            justification: "Giving a one-time amount solves the emergency without creating too much dependancy. By helping your cousin buy supplies, you are being a helpful family member. However, by not giving money every single month, you are also helping him learn how to manage their own money. If you gave him money every month, he may not learn to make money himself because he's used to relying on your funds. Giving him once is the perfect mix of being kind and setting him for future independence.",
          },
          {
            id: "swan-l5-s2",
            context: "You see different ways to help in your neighborhood. There is a food pantry, a local animal shelter, and a small youth center. These are established groups but can use some extra help from you.",
            choices: [
              { text: "Give $100 equally to all three groups every month.", quality: "okay", xp: 300 },
              { text: "Volunteer a full day at a local group, but don't donate.", quality: "bad", xp: 100 },
              { text: "Give $50 to the food pantry and the youth center and volunteer at the local animal shelter monthly.", quality: "best", xp: 500 },
            ],
            justification: "Combining donations with volunteering is the best approach! Money donations let organizations buy exactly what they need most, such as medical supplies or food for a puppy. Giving money is great, and volunteering on top of that is even better! Volunteering gives them your time and energy, which is often more valuable than just money! It's also very important to physically interact with and help people you are donating to.",
          },
          {
            id: "swan-l5-s3",
            context: "You heard about a new charity organization that needs quick donations to help build a children's hospital to help fight off a disease going on in your neighborhood.",
            choices: [
              { text: "Give $600 all at once and volunteer monthly with the organization.", quality: "best", xp: 500 },
              { text: "Other people are already donating enough money to the organization, so you save your money thinking you don't have to.", quality: "bad", xp: 100 },
              { text: "Set up a small monthly donation of $50 from your savings and volunteer monthly.", quality: "okay", xp: 300 },
            ],
            justification: "Giving $600 all at once allows big projects like building a hospital to gain momentum and get things done. Buying things like X-ray machines or beds requires large payments, and your donation helps a lot here! Adding monthly volunteering on top of that makes you even more helpful because you gave them a giant head start and you continue to help afterwards. The monthly $50 option is also great because it's the \"Steady Shield\" move that the hospital can rely on for a long time!",
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
            justification: "The Bakery is the best because it offers steady pay and a fixed schedule. For someone just starting out, having a predictable schedule is wise because it helps you live a healthy and consistent life. For other jobs, the \"roller coaster\" of changing pay or working hours makes it very hard to know if you'll have enough money for the next month.",
          },
          {
            id: "beaver-l1-s2",
            context: "After working 3 months, you realize that you need more money to save up for college. So what should you do next?",
            choices: [
              { text: "Work another full job as an online website manager at night after you finish work at the bakery.", quality: "bad", xp: 100 },
              { text: "Start doing online tutoring only during free hours.", quality: "best", xp: 500 },
              { text: "Stick with one job for now and wait for a promotion.", quality: "okay", xp: 300 },
            ],
            justification: "Online Tutoring is the smartest choice. Since you already work long hours at your first job, taking another tiring full-shift job at night would make you so tired you might get sick or perform poorly at your original job. Tutoring during free hours allows you to earn extra money for college without burning out!",
          },
          {
            id: "beaver-l1-s3",
            context: "After working a few months, you need to decide on what method to get paid.",
            teaching: "When you work, there are different ways you can get paid! Direct Deposit is the most modern and common method. Your boss transfers money from their bank account to your bank account on payday! The only thing your boss needs is your bank account information, and the transaction is done. A Paper Check is a special piece of paper your boss can give you. You take it to your bank, and the bank puts that money into your bank account. It works, but you have to actually go to the bank! Lastly, getting paid in Cash means your boss hands you real paper money and coins. However, cash can be harder to track because it doesn't leave behind a digital record, while online transfers do! That's why most adults get paid digitally!",
            choices: [
              { text: "Your pay goes by direct deposit into your bank account.", quality: "best", xp: 500 },
              { text: "Get a paper check and deposit it using a bank app.", quality: "okay", xp: 300 },
              { text: "Get paid in cash.", quality: "bad", xp: 100 },
            ],
            justification: "Direct Deposit is the smartest because it is safe and automatic. The only thing your boss needs is your bank account information, and you don't need to do anything more than provide that information! Your boss transfers the money, and it goes straight into your bank account, so you don't have to worry about losing a paper check or losing cash.",
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
            context: "You get your first paycheck and need to pay for your rent, food, taxes, clothes, and other daily items, but your high school friend is asking to eat dinner at a fancy restaurant after months of not seeing each other.",
            choices: [
              { text: "Pay all your basic bills first. Realize you have no money left. Ask your friend to hang out at a cheaper restaurant.", quality: "best", xp: 500 },
              { text: "Pay for most of your needs, but buy used clothes instead of new ones to save money to meet your friend for dinner.", quality: "okay", xp: 300 },
              { text: "Meet your friend at the fancy restaurant and focus on your needs more in your next paycheck.", quality: "bad", xp: 100 },
            ],
            justification: "Both the first and second options are great! Paying your bills first and being honest with your friend is the most reasonable move. The second option also gives you extra money for dinner, showing you can be smart with shopping without missing out on fun. Lastly, choosing to prioritize fun over your needs can end up being painful when it comes time for you to pay bills, tuition fees, or other daily needs.",
          },
          {
            id: "beaver-l2-s2",
            context: "You have $50 left after paying all your needs. You really want to treat yourself, but you can only pick one of the following:",
            choices: [
              { text: "Go to the movies with snacks and have fun for a night.", quality: "okay", xp: 300 },
              { text: "Buy flowers for your mom as Mother's Day is coming up.", quality: "best", xp: 500 },
              { text: "Buy a PS5, but pay more than the budget, so you have to adjust next week's needs and wants.", quality: "bad", xp: 100 },
            ],
            justification: "Flowers for Mom is the winner because it is a meaningful \"want.\" It's important to understand that not all \"wants\" have the same value. While movies are fun, using your extra money to show love to your family builds strong relationships, which can be more valuable than a movie. Buying a PS5 you can't afford creates a deficit for your food and rent next week, and is not the best financial decision.",
          },
          {
            id: "beaver-l2-s3",
            context: "Your old laptop, which you use to manage your work, has started freezing and shutting down randomly. At the same time, your phone's screen is cracked, making it hard to read texts, but it still works. You have enough saved for one upgrade.",
            choices: [
              { text: "Buy a high-end Gaming MacBook using a payment plan.", quality: "bad", xp: 100 },
              { text: "Buy the newest iPhone and a cheap laptop repair kit.", quality: "okay", xp: 300 },
              { text: "Buy a mid-range, reliable laptop to replace your old one.", quality: "best", xp: 500 },
            ],
            justification: "The Mid-range Laptop is the smartest move. Since you use your laptop for work, a working computer is a \"Need.\" A phone with a cracked screen is annoying, but if it still works, it's not the first priority. Getting a reliable, affordable laptop ensures your job stays safe without wasting money on a Gaming MacBook that has fancy features you don't actually need for your job.",
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
            teaching: "When you don't earn a lot of money, every dollar matters even more!  It's very important to know what you need to prioritize in terms of spending, so that you're not spending money on the wrong things. \"Needs\" are things you absolutely must pay for to survive and stay safe, like rent (so you have a roof over your head), food (so you don't starve), and transportation (so you can get to work). \"Wants\" are fun things like video games, eating out, or new sneakers. They're nice to have but you don't technically \"need\" them. When your income is low, the smartest move is to cover all your needs first, save a little bit for emergencies, and only then spend whatever amount is left on wants.",
            choices: [
              { text: "Prioritize needs and focus on savings with the rest of your money by using a 65/15/20 split (65% on needs, 15% on wants, 20% on savings).", quality: "best", xp: 500 },
              { text: "Prioritize needs but put wants and savings at an equal rate by using a 55/25/20 split (55% on needs, 25% on wants, 20% on savings).", quality: "bad", xp: 100 },
              { text: "Prioritize needs but spend more on fun than savings by using a 65/20/15 split (65% on needs, 20% on wants, 15% on savings).", quality: "okay", xp: 300 },
            ],
            justification: "The 65/15/20 split is the wisest choice! When your income is isn't very high, it's important to prioritize your needs first, and then split what's left into your wants and savings. Having that extra cushion for your needs is super important because one small emergency could be a big problem. This plan makes sure your needs are met first, but your future is also very well-protected. Also, know that this split can be modified based on your monthly income and circumstances. There isn't one correct split that fits for everyone!",
          },
          {
            id: "beaver-l3-s2",
            context: "It's getting colder, and you need to buy a jacket to keep you warm throughout the winter, but you have a limited budget.",
            choices: [
              { text: "Wait to buy an expensive, high-quality jacket that lasts long.", quality: "okay", xp: 300 },
              { text: "Buy a cheaper jacket for this winter that is still warm and convenient.", quality: "bad", xp: 100 },
              { text: "Use a bit of savings to buy a jacket that will likely last two winters.", quality: "best", xp: 500 },
            ],
            justification: "This choice balances quality and cost. Buying a jacket that lasts two winters means you are spending a little more than the cheapest one, but you won't have to buy another jacket next year. It's a \"Smart Save\" because it keeps you warm now and protects your wallet for the next two years!",
          },
          {
            id: "beaver-l3-s3",
            context: "You want to save for a car that makes the transition from your home to work faster and easier.",
            teaching: "One money tip that many successful people say is “pay yourself first.” It means saving money as soon as you get paid instead of waiting until the end of the month. This is useful because if you spend first and save later, there may not be much money left to save, as small purchases can add up quickly. But if you put some money, such as 15% of your paycheck, into savings right away, you know that money is safe before you start spending.",
            choices: [
              { text: "Make a plan to consistently save 15% of income, even if it means cutting back on non-essential spending.", quality: "best", xp: 500 },
              { text: "Make a plan to consistently save 5% of income, and enjoy the small wants.", quality: "okay", xp: 300 },
              { text: "Decide to save how much is left after every month's expenses are made.", quality: "bad", xp: 100 },
            ],
            justification: "Save 15% consistently is the winner because it uses the \"pay yourself first\" rule. By deciding to save 15% before spending on fun, you guarantee that your car fund will grow every single month. If you only save whatever is left, you might find yourself with no extra cash because small payments add up fast!",
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
            context: "You have a small emergency: your bicycle broke down and you need it to get to work every day. Repair costs are too expensive to pay right now.",
            choices: [
              { text: "Use your emergency savings to pay for the repair right away.", quality: "best", xp: 500 },
              { text: "Ask a friend to lend you the money and pay them back next month.", quality: "okay", xp: 300 },
              { text: "Put the repair on a credit card and pay the minimum each month.", quality: "bad", xp: 100 },
            ],
            justification: "Using your emergency savings is exactly what it was built for! This is why we build a safety net — so when small emergencies pop up, you can handle them without going into debt. Credit card minimum payments pile up interest quickly, which can turn a small problem into a big one.",
          },
          {
            id: "beaver-l4-s2",
            context: "You remember the car you saw earlier, and think about buying it to help you move from place to place, but you don't have enough money saved.",
            choices: [
              { text: "Ask three friends to equally lend you some money. Pay them back in the next few months.", quality: "bad", xp: 100 },
              { text: "Use a store installment plan that splits the car's cost into predictable amounts over the next few months without a loan.", quality: "best", xp: 500 },
              { text: "Get a loan from the bank that has interest but is safe and protected.", quality: "okay", xp: 300 },
            ],
            justification: "A store installment plan is the safest path. It usually doesn't involve a scary bank, and you know exactly how much you owe every month. It's like a small step-by-step path to owning a car. You're essentially paying for the car over months, not all at once. A bank loan is also a solid choice because banks have clear rules and contracts that protect you, and it helps you build a \"credit score\" like gaining XP for your financial life!",
          },
          {
            id: "beaver-l4-s3",
            context: "Your home suffers from a fire and requires repair quickly. The cost is too high to cover currently.",
            choices: [
              { text: "Apply for a bank emergency loan or personal loan with structured repayment.", quality: "best", xp: 500 },
              { text: "Ask close family and friends to cover the costs for now.", quality: "okay", xp: 300 },
              { text: "Use multiple credit cards and small loans to piece together the funds.", quality: "bad", xp: 100 },
            ],
            justification: "A Bank Emergency Loan is the winner here. A house fire is a huge emergency, and you need a structured plan. A bank loan gives you a clear map of exactly how much you must pay each month for several years. Trying to use multiple credit cards is dangerous because the high interest rates will grow so fast that you might never be able to pay it all back.",
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
            teaching: "Starting a business costs money (a lot, actually!). You need to buy ingredients, equipment, and pay for permits before you even sell your first item! Loans are what help with all these costs. A loan is when a bank (or sometimes a person) lets you borrow their money, while you promise to pay them back after years. But here's the catch: you don't just pay back what you borrowed, but you also pay a little extra called \"interest.\" Interest is like a thank-you fee you pay the bank for letting you use their money. For example, if you borrow $1,000 with 10% interest, you'd pay back $1,100 total (original $1,000 and $100 interest fee). The lower the interest rate, the less extra you have to pay, which means more money stays in your pocket! In the case of loans, low interest is always better.",
            choices: [
              { text: "Personal loan from a bank that has a higher interest rate than other options.", quality: "bad", xp: 100 },
              { text: "Business loan from a bank with a separate program for new business owners and a structured repayment plan.", quality: "best", xp: 500 },
              { text: "Informal loan from a rich family member who seems flexible about interest.", quality: "okay", xp: 300 },
            ],
            justification: "A Business Loan is the gold standard. Unlike a personal loan, which can have high interest, business loans are designed specifically for people like you, who want to start a business on their own. They give you a structured repayment plan, which is like a map that tells you exactly how much to pay back each month. This helps you stay organized so you don't get lost in debt in the future!",
          },
          {
            id: "dog-l1-s2",
            context: "You want to expand your snack business and buy a bigger oven. You consider whether to take a loan or not.",
            teaching: "Taking out too many loans is like carrying too many heavy backpacks at once. Every loan you take means you owe money plus interest, and all those payments add up. Sometimes, the smartest thing to do is wait and use your own savings instead. When you use money you've already saved, you don't owe anyone anything (no interest)! It might take longer to save up, but the money you earn is 100% yours.",
            choices: [
              { text: "Take a bank business loan with a structured repayment plan.", quality: "okay", xp: 300 },
              { text: "Don't take a loan, but grow using savings.", quality: "best", xp: 500 },
              { text: "Take a small, informal loan from a friend.", quality: "bad", xp: 100 },
            ],
            justification: "Using savings is a very smart move if you can afford it. When you use your own savings, you don't have to pay interest (that extra money you pay back to the bank). Every penny you earn stays in your pocket! A bank business loan is also a good choice if your savings are too small, because it helps you grow faster using a safe, professional plan.",
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
            justification: "Paying more than the minimum on your loan is an excellent strategy because it focuses on freeing debt. By paying more, you are \"killing\" the interest before it has a chance to grow. Paying the loan first is most important because interest keeps building on. If you leave it to be, you're paying more unnecessary interest! Once that loan is gone, all the money you earn belongs to you.",
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
            justification: "Budgeting based on your lowest-income months is the safest approach. This way, you can always cover your needs and loan payments even when income is low. During good months, you get to save the extra money as a bonus! This strategy works best if you have a monthly income that changes every month.",
          },
          {
            id: "dog-l3-s2",
            context: "One month, a piece of your snack-producing equipment breaks and needs to be fixed, costing more than you expected. You need to pay for the repair quickly.",
            choices: [
              { text: "Reduce spending on wants for the month and delay saving until the repair is paid for.", quality: "best", xp: 500 },
              { text: "Use your emergency savings and adjust your budget for the next month to rebuild it.", quality: "okay", xp: 300 },
              { text: "Pay for the repair and go with your original budget for the next month.", quality: "bad", xp: 100 },
            ],
            justification: "Both reducing wants and using emergency savings are winners! Sacrificing \"wants\" to pay the bill keeps your savings safe for an even bigger emergency later. Using your emergency savings is also great! Just remember to refill those savings next month.",
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
            teaching: "When most people hear \"investing,\" they think of stocks and the stock market. But investing is actually much bigger than that! Investing simply means spending money on something today that will help you make even more money in the future. For example, if you buy a better oven for your bakery, and you can bake twice as many cookies in the same amount of time, that means more cookies to sell and more money earned! That oven was an investment. If you take a class to learn a new skill, that's also an investment! Even buying a good pair of work shoes so your feet don't hurt and you can work longer is a kind of investment. The key question to ask yourself is: \"Will spending this money now help me earn more money later?\" If the answer is yes, it might be a smart investment!",
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
            teaching: "In business, there are two ways to invest your extra money. Short-term investing is like a sprint: you spend money on something hoping it will pay off quickly, maybe in a few weeks or months. For example, running a special ad campaign for a holiday sale. It might bring in quick cash, but the results don't always last. Long-term investing is like planting a garden: you spend money on things that take a while to pay off but keep giving you rewards for years and years. For example, buying better equipment or training your workers to be more skilled. At first it feels like nothing is happening, but over time your business gets stronger, faster, and more profitable. Most successful business owners focus more on long-term investments because they build something that lasts!",
            choices: [
              { text: "Invest in basic marketing, like setting up social media ads or local promotions.", quality: "best", xp: 500 },
              { text: "Invest in improving supply efficiency, such as buying ingredients in bulk to lower costs per unit.", quality: "best", xp: 500 },
              { text: "Keep the money as cash to maintain flexibility in case of future expenses for the business.", quality: "okay", xp: 300 },
            ],
            justification: "Both marketing and big purchases are the best because they represent \"growth\" versus \"efficiency.\" Marketing plants seeds to bring in more customers and grow your total sales. Buying in bulk lowers your costs, meaning you make more profit on every single snack. Whether you choose to bring in more people or make your process cheaper, both choices help your business level up!",
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
            justification: "Both donating snacks and donating money are great because they show generosity in two different ways! Donating snacks makes sure delicious food doesn't go to waste and puts smiles on children's faces. Donating profits gives the children's center the ability to pay for things they need most, like new beds or medical care. Both choices build a strong bond between your business and the community!",
          },
          {
            id: "dog-l5-s2",
            context: "A local school asks if you can provide snacks for a community event. They are requesting a lower price because it is for a community event.",
            choices: [
              { text: "Provide the snacks for the original price because selling at a lower price is risky for the business.", quality: "okay", xp: 300 },
              { text: "Provide the snacks for a lower price as requested and decide to donate monthly snacks to the school.", quality: "bad", xp: 100 },
              { text: "Offer a discounted price for this one event only, making sure the cost still fits within your budget.", quality: "best", xp: 500 },
            ],
            justification: "Offering a discounted price for this one event, but making sure the cost still fits within your budget is the perfect balance. You want to be generous to the school, but you also have to make sure your business doesn't lose money. By offering a discount for just this one event, you help the community while keeping your own business alive and safe. It proves you are both kind and a very smart business owner!",
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
