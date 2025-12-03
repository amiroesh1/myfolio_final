// Simple script to add story to Supabase
const SUPABASE_URL = 'https://lqgurdhcxzjchudxuuts.supabase.co';
const SUPABASE_API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxxZ3VyZGhjeHpqY2h1ZHh1dXRzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ2OTEzMTcsImV4cCI6MjA4MDI2NzMxN30.bS0tS4ODfJNXKLAePTIaYkB4NnXmNyUOl0VMiV1B7KE';

const story = {
  id: 'aziz-kazakhstan-oregon',
  name: 'Aziz',
  date: '2024-09-01T00:00:00.000Z',
  link: null,
  summary: 'My Path from Kazakhstan to Oregon: Lessons from Studying in the USA',
  status: 'APPROVED',
  sections: JSON.stringify([
    {
      title: 'How I grew up',
      content: 'I was born and raised in a small town in western Kazakhstan. For most of my childhood, from first to ninth grade, I studied there in a regular public school, as Kazakhstan has an eleven-year education system.\n\nWhen I turned sixteen, my family moved to the capital, Astana. It was a huge change. Initially, moving from a small town to a large modern metropolis, where everything moved faster—even how people spoke and learned—was a real shock. But at the same time, it was exciting. I spent my last two years of high school in Astana, and that time became a period of rapid growth and adaptation for me.',
      imageUrl: null,
    },
    {
      title: 'Why I decided to study abroad',
      content: 'My desire to study abroad came early. My two older brothers were already studying and living in the USA, and I often visited them with my family. These trips helped me understand how much I loved the academic atmosphere in the States. I really liked how interactive the classes were and how many opportunities existed beyond academics.\n\nFor me, it wasn\'t a difficult decision; it felt natural. I had already seen what life could be like there. For a while, I thought about applying to Canadian universities, but figuring out different application systems seemed like an overwhelming task. So I decided to focus all my time and energy on American universities.',
      imageUrl: null,
    },
    {
      title: 'Admission to University of Oregon',
      content: 'When acceptance letters started coming in, I couldn\'t believe it. I received a full tuition offer from Drexel University in Philadelphia, and then another one from the University of Oregon. I had already been to Oregon because my brother attends Oregon State University, which is nearby, so my family already knew and loved those places. That familiar environment made my choice easier.\n\nOregon also seemed like the perfect balance to me: not as hectic as the East Coast, but still diverse and with a strong academic program. I accepted the offer, and now, looking back, I realize it was one of the best choices of my life.',
      imageUrl: null,
    },
    {
      title: 'Scholarships and the ICSP program',
      content: 'When I was accepted, I received a merit scholarship that covered about $20,000 per year for four years. It didn\'t cover all expenses, but it was a great start. Later, I received another scholarship through the International Cultural Service Program (ICSP)—an initiative by the University of Oregon that supports international students who share their culture through presentations and events for the local community. The ICSP program adds another $25,000 per year, and what I like about it is that it\'s not just financial aid: it encourages cultural exchange.\n\nTogether, these scholarships fully cover my tuition and even a bit more. My parents help me with living expenses like housing, food, and clothing, but I don\'t pay a cent for tuition itself. I really value this opportunity. I know how rare this is for international students, and it reminds me every day why it\'s so important to work hard.',
      imageUrl: null,
    },
    {
      title: 'My grades and SAT marathon',
      content: 'If there\'s anything in my journey that can be called persistence, it\'s SAT preparation.\n\nDuring my years in public school, my GPA was around 4.89 out of 5. In private school, I had a perfect 5.0. Honestly, studying in a public school in Kazakhstan is harder than in a private one, but those years taught me discipline.\n\nRegarding standardized tests, I took both IELTS and SAT. On IELTS, I got 7.0, then retook the writing section, and my superscore was 7.5. But with SAT... that was a long story.\n\nI took it six times. My first official score was 980 out of 1600. My final superscore was 1520. That\'s a difference of 540 points, and it didn\'t happen by chance. I studied for months, every day, solving practice tests, analyzing my mistakes, and memorizing patterns. When I first started, my English was weak. I struggled to understand some questions in the Reading section. But each test taught me something new.\n\nMy main advice for everyone preparing for the SAT is simple: practice and don\'t panic. The Math section is about patterns. The Verbal section is about rhythm and logic. Use official practice tests from College Board, focus on consistency, track every question you get wrong, and practice. Practice is the main advice you\'ll need.\n\nThat\'s how I did it.',
      imageUrl: null,
    },
    {
      title: 'Life outside of studies: basketball and student government',
      content: 'But I didn\'t just focus on academics. Basketball played a huge role in my life. I played for eight years, participated in national competitions, and even won several regional championships.\n\nIn my last two years of high school, I also joined student government and became the Minister of Media and Communications. My school actively used Telegram, so I created a Telegram bot to simplify the process of publishing announcements and news from clubs. It was a small project, but I was very proud of it.\n\nBasketball, leadership, piano, and math olympiads—I ended up filling eight out of ten possible extracurricular fields in the Common App. And it wasn\'t about quantity; I was just trying to show what was truly important to me.',
      imageUrl: null,
    },
    {
      title: 'The application process: from confusion to confidence',
      content: 'I started taking the application process seriously around March of 10th grade. At first, everything seemed too complicated: essays, recommendation letters, standardized tests, and deadlines, but once I got into the rhythm, everything became much easier.\n\nI received incredible support from EducationUSA Kazakhstan—an organization that helps students apply to American universities. They helped me with university selection, SAT preparation, and writing essays that reflected my personal growth, not a pursuit of perfection. My private school also had college counselors who reviewed my essays weekly. This systematic support played a huge role.\n\nMy main advice to future applicants: don\'t go through this journey alone. Ask for advice from counselors, teachers, or those familiar with the US application process.\n\nRegarding recommendation letters, I had more than many. I submitted five: from my math teacher, English teacher, school principal, college counselor, and counselor from EducationUSA. Most universities require only three, but I wanted to present a complete picture of my work ethic and character.',
      imageUrl: null,
    },
    {
      title: 'Adapting to life at the University of Oregon',
      content: 'My first week in the USA was... intense. Everything seemed new: the campus, class schedules, even small things like professors\' expectations for class participation. I remember feeling out of place for the first few days, but that quickly passed. Orientation week at Oregon is full of team-building events, football games, and other activities for freshmen. That\'s where I found my first friends, and I\'m still close with some of them.\n\nAs an international student, it took me time to get used to the new culture, but people here turned out to be very welcoming. I liked how open the professors were: they encourage students to ask questions and discuss projects with them one-on-one.',
      imageUrl: null,
    },
    {
      title: 'My classes',
      content: 'My major is Mathematics and Computer Science. In my first year, I mostly had introductory courses: Calculus I and II, Computer Science I and II, Chinese Pop Culture, and Introduction to Business Administration.\n\nIn the first semesters, the workload seemed manageable because I was still adjusting to life abroad. The classes helped me understand how academics work in an American university. Now, as I move into my second year, I can already feel the workload increasing. There are more assignments, we cover material faster, but when you start catching the rhythm, you feel real progress.',
      imageUrl: null,
    },
    {
      title: 'How to balance studies, research, and work',
      content: 'The spring semester of my first year was probably the most challenging. I was doing homework almost every day while simultaneously applying for research positions and internships. I wrote to professors whose work aligned with my interests in mathematics and computer science, and I also looked for on-campus jobs to gain experience.\n\nYou constantly have to find balance: learn to prioritize and plan. But these challenges make me grow. My advice to everyone planning to study abroad: don\'t underestimate the importance of time management. Studies, work, and socializing—everything depends on your ability to consciously plan your day.',
      imageUrl: null,
    },
    {
      title: 'Future plans',
      content: 'After graduation, I plan to stay in the USA to continue my studies in graduate school. I want to get a Ph.D. in Mathematics or Computer Science. Maybe before that, I\'ll take a gap year to gain experience and explore career development options, but further education is definitely in my long-term plans.\n\nStudying abroad has given me much more than just academic knowledge, as I\'m sure it has for many other international students. It taught me to live independently, understand other cultures, and better understand my own. Every time I give presentations for ICSP or talk to students interested in Kazakhstan, I feel like I\'m connecting worlds a little bit.',
      imageUrl: null,
    },
    {
      title: 'My advice to future applicants',
      content: 'If I had to give one piece of advice to everyone applying to universities abroad, especially from countries like Kazakhstan, I would say this: start early. Time is everything here. The earlier you start preparing for standardized tests, writing essays, and looking for scholarships, the less stress you\'ll experience.\n\nAlso, don\'t let comparisons with others stop you. Everyone has their own path. Some get in with perfect scores, others through incredible stories or achievements. Focus on your strengths.',
      imageUrl: null,
    },
  ]),
};

async function addStory() {
  try {
    console.log('🚀 Adding story to Supabase...\n');
    
    // First, try to check if story exists
    const checkResponse = await fetch(`${SUPABASE_URL}/rest/v1/Story?id=eq.aziz-kazakhstan-oregon&select=id`, {
      method: 'GET',
      headers: {
        'apikey': SUPABASE_API_KEY,
        'Authorization': `Bearer ${SUPABASE_API_KEY}`,
      },
    });

    const existing = await checkResponse.json();
    
    let response;
    if (existing && existing.length > 0) {
      console.log('📝 Story exists, updating...');
      // Update existing
      response = await fetch(`${SUPABASE_URL}/rest/v1/Story?id=eq.aziz-kazakhstan-oregon`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_API_KEY,
          'Authorization': `Bearer ${SUPABASE_API_KEY}`,
          'Prefer': 'return=representation',
        },
        body: JSON.stringify(story),
      });
    } else {
      console.log('✨ Story doesn\'t exist, creating...');
      // Create new
      response = await fetch(`${SUPABASE_URL}/rest/v1/Story`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_API_KEY,
          'Authorization': `Bearer ${SUPABASE_API_KEY}`,
          'Prefer': 'return=representation',
        },
        body: JSON.stringify(story),
      });
    }

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`HTTP ${response.status}: ${error}`);
    }

    const result = await response.json();
    console.log('✅ SUCCESS! Story added/updated in Supabase:');
    console.log(JSON.stringify(result, null, 2));
    console.log('\n🎉 История теперь в базе данных со статусом APPROVED!');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.message.includes('fetch')) {
      console.error('\n💡 Make sure you have internet connection and Supabase URL is correct');
    }
    process.exit(1);
  }
}

// Use dynamic import for fetch if Node.js < 18
if (typeof fetch === 'undefined') {
  import('node-fetch').then(({ default: fetch }) => {
    global.fetch = fetch;
    addStory();
  });
} else {
  addStory();
}

