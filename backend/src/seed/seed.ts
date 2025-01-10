import { MongoClient } from 'mongodb';

async function seed() {
  const uri = 'mongodb://localhost:27017/campaign-manager';
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db('campaign-manager');

    // Clear existing data
    await db.collection('campaigns').deleteMany({});

    // Insert sample campaigns
    const campaigns = [
      {
        title: 'Summer Fashion Campaign',
        description: 'Promote our new summer collection on your social media.',
        deadline: new Date('2024-06-30'),
        status: 'active',
        submissions: [],
        influencerId: '123',
        totalPosts: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Tech Review Series',
        description: 'Create engaging content reviewing our latest gadgets.',
        deadline: new Date('2024-07-15'),
        status: 'active',
        submissions: [],
        influencerId: '123',
        totalPosts: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await db.collection('campaigns').insertMany(campaigns);
    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await client.close();
  }
}

seed();