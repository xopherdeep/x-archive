import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // First, clear existing data
  await prisma.feature.deleteMany({});
  await prisma.exercise.deleteMany({});
  await prisma.activity.deleteMany({});

  console.log('Seeding Money Math activities...');

  // Interactive Activities
  const compoundInterest = await prisma.activity.create({
    data: {
      title: 'Compound Interest Explorer',
      slug: 'compound-interest',
      description: 'See how your money can grow over time with the magic of compound interest!',
      emoji: '💰',
      difficulty: 'interactive',
      gradientFrom: 'from-blue-400',
      gradientTo: 'to-cyan-500',
      order: 1,
      isPublished: true,
      features: {
        create: [
          {
            description: 'Visualize savings growth over time',
            color: 'bg-blue-500',
          },
          {
            description: 'Experiment with interest rates',
            color: 'bg-blue-500',
          },
          {
            description: 'Learn about exponential growth',
            color: 'bg-blue-500',
          },
        ],
      },
    },
  });

  const budgetExplorer = await prisma.activity.create({
    data: {
      title: 'Budget Explorer',
      slug: 'budget-explorer',
      description: 'Learn how to allocate money using percentages and the 50/30/20 rule!',
      emoji: '📊',
      difficulty: 'interactive',
      gradientFrom: 'from-purple-400',
      gradientTo: 'to-indigo-500',
      order: 2,
      isPublished: true,
      features: {
        create: [
          {
            description: 'Create budget with interactive pie chart',
            color: 'bg-purple-500',
          },
          {
            description: 'Balance needs, wants, and savings',
            color: 'bg-purple-500',
          },
          {
            description: 'Convert percentages to dollar amounts',
            color: 'bg-purple-500',
          },
        ],
      },
    },
  });

  const coinCalculator = await prisma.activity.create({
    data: {
      title: 'Coin Value Calculator',
      slug: 'coin-calculator',
      description: 'Practice counting money and understanding different coin values!',
      emoji: '🪙',
      difficulty: 'interactive',
      gradientFrom: 'from-amber-400',
      gradientTo: 'to-orange-500',
      order: 3,
      isPublished: true,
      features: {
        create: [
          {
            description: 'Add coins to see total value',
            color: 'bg-amber-500',
          },
          {
            description: 'Practice making change',
            color: 'bg-amber-500',
          },
          {
            description: 'Learn equivalence with different coin combinations',
            color: 'bg-amber-500',
          },
        ],
      },
    },
  });

  // Beginner Activities
  const changeMaker = await prisma.activity.create({
    data: {
      title: 'Change Maker Challenge',
      slug: 'change-maker',
      description: 'Practice making correct change using different coin combinations!',
      emoji: '💵',
      difficulty: 'beginner',
      gradientFrom: 'from-emerald-400',
      gradientTo: 'to-teal-500',
      order: 4,
      isPublished: true,
      features: {
        create: [
          {
            description: 'Find multiple ways to make the same amount',
            color: 'bg-emerald-500',
          },
          {
            description: 'Practice mental math with money',
            color: 'bg-emerald-500',
          },
          {
            description: 'Learn the value of each coin and bill',
            color: 'bg-emerald-500',
          },
        ],
      },
    },
  });

  const discountDetective = await prisma.activity.create({
    data: {
      title: 'Discount Detective',
      slug: 'discount-detective',
      description: 'Calculate sale prices and learn how percentages work with money!',
      emoji: '🔍',
      difficulty: 'beginner',
      gradientFrom: 'from-rose-400',
      gradientTo: 'to-pink-500',
      order: 5,
      isPublished: true,
      features: {
        create: [
          {
            description: 'Calculate percentages off original prices',
            color: 'bg-rose-500',
          },
          {
            description: 'Find the best deals between different discounts',
            color: 'bg-rose-500',
          },
          {
            description: 'Practice real-world shopping scenarios',
            color: 'bg-rose-500',
          },
        ],
      },
    },
  });

  const allowanceAllocator = await prisma.activity.create({
    data: {
      title: 'Allowance Allocator',
      slug: 'allowance-allocator',
      description: 'Learn how to divide money into different spending categories!',
      emoji: '🏦',
      difficulty: 'beginner',
      gradientFrom: 'from-sky-400',
      gradientTo: 'to-blue-500',
      order: 6,
      isPublished: true,
      features: {
        create: [
          {
            description: 'Split money into spend, save, share categories',
            color: 'bg-sky-500',
          },
          {
            description: 'Track financial goals with progress bars',
            color: 'bg-sky-500',
          },
          {
            description: 'Practice adding and subtracting money',
            color: 'bg-sky-500',
          },
        ],
      },
    },
  });

  // Intermediate Activities
  const taxCalculator = await prisma.activity.create({
    data: {
      title: 'Tax Calculator',
      slug: 'tax-calculator',
      description: 'Understand how sales tax and income tax affect money decisions!',
      emoji: '🧾',
      difficulty: 'intermediate',
      gradientFrom: 'from-indigo-400',
      gradientTo: 'to-violet-500',
      order: 7,
      isPublished: true,
      features: {
        create: [
          {
            description: 'Calculate tax on purchases at different rates',
            color: 'bg-indigo-500',
          },
          {
            description: 'See how income taxes work with tax brackets',
            color: 'bg-indigo-500',
          },
          {
            description: 'Explore differences between pre-tax and post-tax',
            color: 'bg-indigo-500',
          },
        ],
      },
    },
  });

  const currencyConverter = await prisma.activity.create({
    data: {
      title: 'Currency Converter',
      slug: 'currency-converter',
      description: 'Learn about exchange rates and how money values differ globally!',
      emoji: '🌍',
      difficulty: 'intermediate',
      gradientFrom: 'from-lime-400',
      gradientTo: 'to-green-500',
      order: 8,
      isPublished: true,
      features: {
        create: [
          {
            description: 'Convert between different world currencies',
            color: 'bg-lime-500',
          },
          {
            description: 'Understand exchange rate impacts on purchasing power',
            color: 'bg-lime-500',
          },
          {
            description: 'Practice multiplication with decimals',
            color: 'bg-lime-500',
          },
        ],
      },
    },
  });

  const savingsGoalTimeline = await prisma.activity.create({
    data: {
      title: 'Savings Goal Timeline',
      slug: 'savings-goal',
      description: 'Calculate how long it takes to save for different goals!',
      emoji: '⏱️',
      difficulty: 'intermediate',
      gradientFrom: 'from-amber-400',
      gradientTo: 'to-yellow-500',
      order: 9,
      isPublished: true,
      features: {
        create: [
          {
            description: 'Set savings goals and track progress',
            color: 'bg-amber-500',
          },
          {
            description: 'Calculate time required based on deposit amount',
            color: 'bg-amber-500',
          },
          {
            description: 'Learn how interest accelerates savings',
            color: 'bg-amber-500',
          },
        ],
      },
    },
  });

  const lemonadeStand = await prisma.activity.create({
    data: {
      title: 'Lemonade Stand Simulator',
      slug: 'lemonade-stand',
      description: 'Plan and run a lemonade stand business to learn about costs, pricing, and profits!',
      emoji: '🍋',
      difficulty: 'intermediate',
      gradientFrom: 'from-yellow-400',
      gradientTo: 'to-amber-500',
      order: 10,
      isPublished: true,
      features: {
        create: [
          {
            description: 'Calculate startup costs and supplies needed',
            color: 'bg-yellow-500',
          },
          {
            description: 'Set prices and forecast potential profits',
            color: 'bg-yellow-500',
          },
          {
            description: 'Learn business planning and time management',
            color: 'bg-yellow-500',
          },
        ],
      },
    },
  });

  // Advanced Activities
  const stockMarketSimulator = await prisma.activity.create({
    data: {
      title: 'Stock Market Simulator',
      slug: 'stock-simulator',
      description: 'Explore investing with a virtual stock portfolio!',
      emoji: '📈',
      difficulty: 'advanced',
      gradientFrom: 'from-cyan-400',
      gradientTo: 'to-blue-500',
      order: 11,
      isPublished: true,
      features: {
        create: [
          {
            description: 'Buy and sell virtual stocks',
            color: 'bg-cyan-500',
          },
          {
            description: 'Calculate percentage gains and losses',
            color: 'bg-cyan-500',
          },
          {
            description: 'Learn about diversification and risk',
            color: 'bg-cyan-500',
          },
        ],
      },
    },
  });

  const inflationTimeMachine = await prisma.activity.create({
    data: {
      title: 'Inflation Time Machine',
      slug: 'inflation-calculator',
      description: 'See how prices change over time due to inflation!',
      emoji: '⏳',
      difficulty: 'advanced',
      gradientFrom: 'from-fuchsia-400',
      gradientTo: 'to-purple-500',
      order: 12,
      isPublished: true,
      features: {
        create: [
          {
            description: 'Compare prices across different decades',
            color: 'bg-fuchsia-500',
          },
          {
            description: 'Calculate buying power over time',
            color: 'bg-fuchsia-500',
          },
          {
            description: 'Understand why savings need to beat inflation',
            color: 'bg-fuchsia-500',
          },
        ],
      },
    },
  });

  const loanPaymentExplorer = await prisma.activity.create({
    data: {
      title: 'Loan Payment Explorer',
      slug: 'loan-calculator',
      description: 'Understand how loans work and the impact of interest rates!',
      emoji: '🏠',
      difficulty: 'advanced',
      gradientFrom: 'from-red-400',
      gradientTo: 'to-orange-500',
      order: 13,
      isPublished: true,
      features: {
        create: [
          {
            description: 'Calculate monthly payments on different loans',
            color: 'bg-red-500',
          },
          {
            description: 'See the total cost over the life of a loan',
            color: 'bg-red-500',
          },
          {
            description: 'Compare different interest rates and terms',
            color: 'bg-red-500',
          },
        ],
      },
    },
  });

  // Game Activities
  const moneyMathQuizGame = await prisma.activity.create({
    data: {
      title: 'Money Math Quiz Game',
      slug: 'quiz-game',
      description: 'Test your money math knowledge with fun challenges!',
      emoji: '🎮',
      difficulty: 'game',
      gradientFrom: 'from-green-400',
      gradientTo: 'to-emerald-500',
      order: 14,
      isPublished: true,
      features: {
        create: [
          {
            description: 'Answer questions about financial concepts',
            color: 'bg-green-500',
          },
          {
            description: 'Earn virtual badges for correct answers',
            color: 'bg-green-500',
          },
          {
            description: 'Challenge friends with multiplayer mode',
            color: 'bg-green-500',
          },
        ],
      },
    },
  });

  const virtualShoppingTrip = await prisma.activity.create({
    data: {
      title: 'Virtual Shopping Trip',
      slug: 'virtual-shopping',
      description: 'Plan and manage a budget for a simulated shopping expedition!',
      emoji: '🛒',
      difficulty: 'game',
      gradientFrom: 'from-pink-400',
      gradientTo: 'to-rose-500',
      order: 15,
      isPublished: true,
      features: {
        create: [
          {
            description: 'Make choices within a fixed budget',
            color: 'bg-pink-500',
          },
          {
            description: 'Find the best deals and compare prices',
            color: 'bg-pink-500',
          },
          {
            description: 'Calculate sales tax and total spending',
            color: 'bg-pink-500',
          },
        ],
      },
    },
  });

  const financialDecisionSimulator = await prisma.activity.create({
    data: {
      title: 'Financial Decision Simulator',
      slug: 'decision-simulator',
      description: 'See how financial choices affect your future in this simulator!',
      emoji: '🎲',
      difficulty: 'game',
      gradientFrom: 'from-blue-400',
      gradientTo: 'to-indigo-500',
      order: 16,
      isPublished: true,
      features: {
        create: [
          {
            description: 'Make life choices and see financial impacts',
            color: 'bg-blue-500',
          },
          {
            description: 'Balance short-term and long-term priorities',
            color: 'bg-blue-500',
          },
          {
            description: 'Understand consequences of spending vs. saving',
            color: 'bg-blue-500',
          },
        ],
      },
    },
  });

  console.log(`Database has been seeded with ${await prisma.activity.count()} activities`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });