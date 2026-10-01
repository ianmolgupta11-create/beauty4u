import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const isProd = process.env.NODE_ENV === 'production';

// Ensure public directories exist
const publicDir = path.resolve(__dirname, 'public');
const assetsDir = path.resolve(publicDir, 'assets');
const feedDir = path.resolve(assetsDir, 'feed');
const feedPostsFile = path.resolve(feedDir, 'posts.json');
const heroDir = path.resolve(assetsDir, 'hero');
const heroSlidesFile = path.resolve(heroDir, 'slides.json');
const teamDir = path.resolve(assetsDir, 'team');
const teamMembersFile = path.resolve(assetsDir, 'team-members.json');

if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}
if (!fs.existsSync(feedDir)) {
  fs.mkdirSync(feedDir, { recursive: true });
}
if (!fs.existsSync(feedPostsFile)) {
  fs.writeFileSync(feedPostsFile, JSON.stringify([], null, 2));
}
if (!fs.existsSync(heroDir)) {
  fs.mkdirSync(heroDir, { recursive: true });
}
if (!fs.existsSync(heroSlidesFile)) {
  fs.writeFileSync(heroSlidesFile, JSON.stringify([], null, 2));
}
if (!fs.existsSync(teamDir)) {
  fs.mkdirSync(teamDir, { recursive: true });
}

// Support large image payloads (up to 35mb)
app.use(express.json({ limit: '35mb' }));
app.use(express.urlencoded({ extended: true, limit: '35mb' }));

// Explicitly serve /assets from public/assets so public view is guaranteed
app.use('/assets', express.static(assetsDir));
app.use(express.static(publicDir));

// --- 1. PROFILE PICTURE ENDPOINTS ---

// Get current saved public profile image
app.get('/api/profile-image', (req, res) => {
  try {
    const targetFile = path.join(assetsDir, 'profile-picture.jpg');
    if (fs.existsSync(targetFile)) {
      const stats = fs.statSync(targetFile);
      return res.json({
        exists: true,
        url: `/assets/profile-picture.jpg?v=${stats.mtimeMs}`
      });
    }
    return res.json({ exists: false, url: null });
  } catch (error) {
    console.error('Error checking profile image:', error);
    return res.status(500).json({ error: 'Failed to check profile image' });
  }
});

// Upload and save profile image directly into public assets
app.post('/api/upload-profile', (req, res) => {
  try {
    const { dataUrl } = req.body;
    if (!dataUrl || typeof dataUrl !== 'string') {
      return res.status(400).json({ error: 'Missing or invalid dataUrl' });
    }

    const matches = dataUrl.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      return res.status(400).json({ error: 'Invalid base64 data URL string' });
    }

    const base64Data = matches[2];
    const buffer = Buffer.from(base64Data, 'base64');
    const targetFile = path.join(assetsDir, 'profile-picture.jpg');
    fs.writeFileSync(targetFile, buffer);

    console.log(`Saved profile image to ${targetFile} (${buffer.length} bytes)`);

    return res.json({
      success: true,
      message: 'Profile image saved in assets for public view',
      url: `/assets/profile-picture.jpg?v=${Date.now()}`
    });
  } catch (error) {
    console.error('Failed to save profile picture:', error);
    return res.status(500).json({ error: 'Failed to write profile image to assets' });
  }
});

// Delete / Reset custom profile image
app.delete('/api/profile-image', (req, res) => {
  try {
    const targetFile = path.join(assetsDir, 'profile-picture.jpg');
    if (fs.existsSync(targetFile)) {
      fs.unlinkSync(targetFile);
    }
    return res.json({ success: true, message: 'Profile image reset' });
  } catch (error) {
    console.error('Failed to remove profile image:', error);
    return res.status(500).json({ error: 'Failed to remove image' });
  }
});

// --- 1C. FOUNDER PICTURE ENDPOINTS ---

// Get current saved public founder image
app.get('/api/founder-image', (req, res) => {
  try {
    const targetFile = path.join(assetsDir, 'founder-picture.jpg');
    if (fs.existsSync(targetFile)) {
      const stats = fs.statSync(targetFile);
      return res.json({
        exists: true,
        url: `/assets/founder-picture.jpg?v=${stats.mtimeMs}`
      });
    }
    return res.json({ exists: false, url: null });
  } catch (error) {
    console.error('Error checking founder image:', error);
    return res.status(500).json({ error: 'Failed to check founder image' });
  }
});

// Upload and save founder image directly into public assets
app.post('/api/upload-founder-image', (req, res) => {
  try {
    const { dataUrl } = req.body;
    if (!dataUrl || typeof dataUrl !== 'string') {
      return res.status(400).json({ error: 'Missing or invalid dataUrl' });
    }

    const matches = dataUrl.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      return res.status(400).json({ error: 'Invalid base64 data URL string' });
    }

    const base64Data = matches[2];
    const buffer = Buffer.from(base64Data, 'base64');
    const targetFile = path.join(assetsDir, 'founder-picture.jpg');
    fs.writeFileSync(targetFile, buffer);

    console.log(`Saved founder image to ${targetFile} (${buffer.length} bytes)`);

    return res.json({
      success: true,
      message: 'Founder image saved in public assets (/assets/founder-picture.jpg)',
      url: `/assets/founder-picture.jpg?v=${Date.now()}`
    });
  } catch (error) {
    console.error('Failed to save founder picture:', error);
    return res.status(500).json({ error: 'Failed to write founder image to assets' });
  }
});

// Delete / Reset founder image
app.delete('/api/founder-image', (req, res) => {
  try {
    const targetFile = path.join(assetsDir, 'founder-picture.jpg');
    if (fs.existsSync(targetFile)) {
      fs.unlinkSync(targetFile);
    }
    return res.json({ success: true, message: 'Founder image reset to default' });
  } catch (error) {
    console.error('Failed to remove founder image:', error);
    return res.status(500).json({ error: 'Failed to remove founder image' });
  }
});

// --- 1D. TEAM MEMBERS & STYLIST PHOTOS ENDPOINTS ---

const DEFAULT_TEAM_MEMBERS = [
  {
    id: 'kailtyn-whyte',
    name: 'Kailtyn Whyte',
    role: 'Hairstylist and Beauty Therapist',
    experienceYears: 8,
    specialties: ['Hair Colouring & Foils', 'Nanoplasty & Keratin', 'Precision Cuts', 'Beauty Treatments'],
    bio: 'Kailtyn brings versatile dual expertise across hair colouring, custom highlights, precision cutting, and beauty therapies at Beauty 4 U Bathurst. She loves tailoring complete transformations for our clients.',
    signatureStyle: 'Seamless dimensional colour & polished bouncy blow-outs',
    favoriteProduct: 'Wella Color Touch & Deep Hydration Treatment',
    instagramHandle: '@beauty4ubathurst',
    rating: 5.0,
    reviewCount: 164,
    availableDays: ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    accentColor: '#B08D57',
    avatarPlaceholderColor: '#F8F4EC'
  },
  {
    id: 'madeline-holding',
    name: 'Madeline Holding',
    role: 'Beauty Therapist',
    experienceYears: 7,
    specialties: ['Hydrodermabrasion Facials', 'Lash & Brow Artistry', 'Dermal Peels', 'Full Body Waxing'],
    bio: 'Madeline is dedicated to glowing skin health and bespoke brow and lash design. Her tailored facial therapies and meticulous attention to detail ensure a deeply relaxing, revitalizing visit at Beauty 4 U Bathurst.',
    signatureStyle: 'Aqua-infusion Hydrodermabrasion & Hybrid Brow Sculpting',
    favoriteProduct: 'Dermalogica Daily Microfoliant & Hydra-Gel',
    instagramHandle: '@beauty4ubathurst',
    rating: 5.0,
    reviewCount: 148,
    availableDays: ['Monday', 'Wednesday', 'Thursday', 'Friday'],
    accentColor: '#6B7A68',
    avatarPlaceholderColor: '#EEF2EC'
  },
  {
    id: 'sienna-rozema',
    name: 'Sienna Rozema',
    role: 'Apprentice Hairdresser & Salon Assistant',
    experienceYears: 2,
    specialties: ['Relaxing Hair Washes & Scalp Massage', 'Blow Waves & Curls', 'Apprentice Specials', 'Hair Care'],
    bio: 'Sienna delivers exceptional basin care, dreamy scalp massages, and long-lasting blow waves and curls. Clients love her gentle technique and welcoming energy at Beauty 4 U Bathurst.',
    signatureStyle: 'Signature Relaxing Basin Massage & Bouncy Beach Curls',
    favoriteProduct: 'Mr Smith Luxury Masque & Leave-In Creme',
    instagramHandle: '@beauty4ubathurst',
    rating: 4.9,
    reviewCount: 92,
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    accentColor: '#936D48',
    avatarPlaceholderColor: '#FAF5EE'
  }
];

// Helper to get team members with disk image check
function getTeamMembersList() {
  let members = DEFAULT_TEAM_MEMBERS;
  if (fs.existsSync(teamMembersFile)) {
    try {
      const data = JSON.parse(fs.readFileSync(teamMembersFile, 'utf-8'));
      if (Array.isArray(data) && data.length > 0) {
        members = data;
      }
    } catch (e) {
      console.warn('Could not read teamMembersFile', e);
    }
  }

  // Filter out any leftover marcus or chloe
  members = members.filter((m: any) => m.id !== 'marcus' && m.id !== 'chloe');

  // Attach real public photo URL if present on disk
  return members.map((m: any) => {
    const photoFile = path.join(teamDir, `${m.id}.jpg`);
    if (fs.existsSync(photoFile)) {
      const stats = fs.statSync(photoFile);
      return { ...m, imageUrl: `/assets/team/${m.id}.jpg?v=${stats.mtimeMs}` };
    }
    if (m.id === 'belinda') {
      const founderFile = path.join(assetsDir, 'founder-picture.jpg');
      if (fs.existsSync(founderFile)) {
        const stats = fs.statSync(founderFile);
        return { ...m, imageUrl: `/assets/founder-picture.jpg?v=${stats.mtimeMs}` };
      }
    }
    return m;
  });
}

// Get all team members
app.get('/api/team-members', (req, res) => {
  try {
    const list = getTeamMembersList();
    return res.json({ success: true, members: list });
  } catch (error) {
    console.error('Failed to get team members:', error);
    return res.status(500).json({ error: 'Failed to retrieve team members' });
  }
});

// Update/Save full team list
app.post('/api/team-members', (req, res) => {
  try {
    const { members } = req.body;
    if (!Array.isArray(members)) {
      return res.status(400).json({ error: 'Expected members array' });
    }
    const cleanMembers = members.filter((m: any) => m.id !== 'marcus' && m.id !== 'chloe');
    fs.writeFileSync(teamMembersFile, JSON.stringify(cleanMembers, null, 2));
    const updated = getTeamMembersList();
    return res.json({ success: true, members: updated });
  } catch (error) {
    console.error('Failed to save team members:', error);
    return res.status(500).json({ error: 'Failed to save team members' });
  }
});

// Upload a photo for a specific team member
app.post('/api/upload-team-photo', (req, res) => {
  try {
    const { stylistId, dataUrl } = req.body;
    if (!stylistId || !dataUrl || typeof dataUrl !== 'string') {
      return res.status(400).json({ error: 'Missing stylistId or dataUrl' });
    }

    const matches = dataUrl.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      return res.status(400).json({ error: 'Invalid base64 data URL' });
    }

    const buffer = Buffer.from(matches[2], 'base64');
    const targetFile = path.join(teamDir, `${stylistId}.jpg`);
    fs.writeFileSync(targetFile, buffer);

    if (stylistId === 'belinda') {
      const founderFile = path.join(assetsDir, 'founder-picture.jpg');
      fs.writeFileSync(founderFile, buffer);
    }

    const photoUrl = `/assets/team/${stylistId}.jpg?v=${Date.now()}`;

    let members = getTeamMembersList();
    members = members.map((m: any) => (m.id === stylistId ? { ...m, imageUrl: photoUrl } : m));
    fs.writeFileSync(teamMembersFile, JSON.stringify(members, null, 2));

    console.log(`Saved team photo for ${stylistId} to ${targetFile} (${buffer.length} bytes)`);

    return res.json({
      success: true,
      url: photoUrl,
      members
    });
  } catch (error) {
    console.error('Failed to upload team photo:', error);
    return res.status(500).json({ error: 'Failed to save team member photo' });
  }
});

// Delete a team member
app.delete('/api/team-members/:id', (req, res) => {
  try {
    const { id } = req.params;
    let members = getTeamMembersList();
    members = members.filter((m: any) => m.id !== id);
    fs.writeFileSync(teamMembersFile, JSON.stringify(members, null, 2));

    const photoFile = path.join(teamDir, `${id}.jpg`);
    if (fs.existsSync(photoFile)) {
      fs.unlinkSync(photoFile);
    }

    return res.json({ success: true, members });
  } catch (error) {
    console.error('Failed to delete team member:', error);
    return res.status(500).json({ error: 'Failed to delete team member' });
  }
});

// Reset team members to default
app.post('/api/reset-team-members', (req, res) => {
  try {
    fs.writeFileSync(teamMembersFile, JSON.stringify(DEFAULT_TEAM_MEMBERS, null, 2));
    const members = getTeamMembersList();
    return res.json({ success: true, members });
  } catch (error) {
    console.error('Failed to reset team members:', error);
    return res.status(500).json({ error: 'Failed to reset team members' });
  }
});

// --- 1B. HERO SHOWCASE IMAGE & SLIDESHOW ENDPOINTS ---

interface HeroSlide {
  id: string;
  url: string;
  createdAt: number;
}

// Helper to read current slides
function getHeroSlides(): HeroSlide[] {
  let slides: HeroSlide[] = [];
  if (fs.existsSync(heroSlidesFile)) {
    try {
      slides = JSON.parse(fs.readFileSync(heroSlidesFile, 'utf-8') || '[]');
    } catch (e) {
      slides = [];
    }
  }

  // Backward compatibility: If no slides yet, check for legacy hero-salon.jpg
  const legacyFile = path.join(assetsDir, 'hero-salon.jpg');
  if (slides.length === 0 && fs.existsSync(legacyFile)) {
    const stats = fs.statSync(legacyFile);
    slides.push({
      id: 'legacy-hero',
      url: `/assets/hero-salon.jpg?v=${stats.mtimeMs}`,
      createdAt: stats.mtimeMs
    });
  }

  return slides;
}

// Get all current saved public hero slides
app.get('/api/hero-slides', (req, res) => {
  try {
    const slides = getHeroSlides();
    return res.json({ success: true, slides });
  } catch (error) {
    console.error('Error getting hero slides:', error);
    return res.status(500).json({ error: 'Failed to retrieve hero slides' });
  }
});

// Upload one or multiple hero images for slideshow
app.post('/api/upload-hero-slides', (req, res) => {
  try {
    const { dataUrls, dataUrl } = req.body;
    const urlsToProcess: string[] = Array.isArray(dataUrls) ? dataUrls : (dataUrl ? [dataUrl] : []);

    if (urlsToProcess.length === 0) {
      return res.status(400).json({ error: 'No image data provided' });
    }

    const currentSlides = getHeroSlides();
    const newSlides: HeroSlide[] = [];
    const timestamp = Date.now();

    urlsToProcess.forEach((rawUrl, idx) => {
      if (typeof rawUrl !== 'string') return;
      const matches = rawUrl.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
      if (!matches || matches.length !== 3) return;

      const base64Data = matches[2];
      const buffer = Buffer.from(base64Data, 'base64');
      const slideId = `slide-${timestamp}-${idx + 1}`;
      const filename = `${slideId}.jpg`;
      const targetPath = path.join(heroDir, filename);

      fs.writeFileSync(targetPath, buffer);
      console.log(`Saved hero slide to ${targetPath} (${buffer.length} bytes)`);

      newSlides.push({
        id: slideId,
        url: `/assets/hero/${filename}?v=${timestamp}`,
        createdAt: timestamp + idx
      });
    });

    const updatedSlides = [...currentSlides, ...newSlides];
    fs.writeFileSync(heroSlidesFile, JSON.stringify(updatedSlides, null, 2));

    return res.json({
      success: true,
      message: `${newSlides.length} photo(s) saved into public assets for slideshow`,
      slides: updatedSlides,
      added: newSlides
    });
  } catch (error) {
    console.error('Failed to upload hero slides:', error);
    return res.status(500).json({ error: 'Failed to save hero slideshow photos' });
  }
});

// Delete a single hero slide
app.delete('/api/hero-slides/:id', (req, res) => {
  try {
    const { id } = req.params;
    const targetFile = path.join(heroDir, `${id}.jpg`);
    if (fs.existsSync(targetFile)) {
      fs.unlinkSync(targetFile);
    }
    // Also if legacy
    if (id === 'legacy-hero') {
      const legacyFile = path.join(assetsDir, 'hero-salon.jpg');
      if (fs.existsSync(legacyFile)) {
        fs.unlinkSync(legacyFile);
      }
    }

    const currentSlides = getHeroSlides();
    const updated = currentSlides.filter((s) => s.id !== id);
    fs.writeFileSync(heroSlidesFile, JSON.stringify(updated, null, 2));

    return res.json({ success: true, slides: updated, message: 'Slide deleted' });
  } catch (error) {
    console.error('Failed to delete hero slide:', error);
    return res.status(500).json({ error: 'Failed to delete slide' });
  }
});

// Delete all hero slides (reset to default)
app.delete('/api/hero-slides', (req, res) => {
  try {
    if (fs.existsSync(heroDir)) {
      const files = fs.readdirSync(heroDir);
      for (const file of files) {
        if (file.endsWith('.jpg') || file.endsWith('.png')) {
          fs.unlinkSync(path.join(heroDir, file));
        }
      }
      fs.writeFileSync(heroSlidesFile, JSON.stringify([], null, 2));
    }
    const legacyFile = path.join(assetsDir, 'hero-salon.jpg');
    if (fs.existsSync(legacyFile)) {
      fs.unlinkSync(legacyFile);
    }
    return res.json({ success: true, slides: [], message: 'Hero slideshow reset to default' });
  } catch (error) {
    console.error('Failed to reset hero slides:', error);
    return res.status(500).json({ error: 'Failed to reset hero slides' });
  }
});

// Backward compatibility legacy endpoint
app.get('/api/hero-image', (req, res) => {
  const slides = getHeroSlides();
  if (slides.length > 0) {
    return res.json({ exists: true, url: slides[0].url });
  }
  return res.json({ exists: false, url: null });
});
app.post('/api/upload-hero-image', (req, res) => {
  req.url = '/api/upload-hero-slides';
  return app._router.handle(req, res);
});
app.delete('/api/hero-image', (req, res) => {
  req.url = '/api/hero-slides';
  return app._router.handle(req, res);
});

// --- 2. FEED TRANSFORMATION UPLOAD ENDPOINTS ---

// Get all custom uploaded feed posts from public directory
app.get('/api/feed-posts', (req, res) => {
  try {
    if (fs.existsSync(feedPostsFile)) {
      const data = fs.readFileSync(feedPostsFile, 'utf-8');
      const posts = JSON.parse(data || '[]');
      return res.json({ success: true, posts });
    }
    return res.json({ success: true, posts: [] });
  } catch (error) {
    console.error('Failed to read feed posts:', error);
    return res.status(500).json({ error: 'Failed to read feed posts' });
  }
});

// Upload a new transformation image to public assets and save post metadata
app.post('/api/upload-feed-post', (req, res) => {
  try {
    const {
      dataUrl,
      styleName,
      stylistName,
      category,
      formulaNote,
      timeSpent,
      caption,
      tags
    } = req.body;

    if (!dataUrl || typeof dataUrl !== 'string') {
      return res.status(400).json({ error: 'Image data is required' });
    }

    const matches = dataUrl.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      return res.status(400).json({ error: 'Invalid base64 image data' });
    }

    const base64Data = matches[2];
    const buffer = Buffer.from(base64Data, 'base64');
    const postId = `feed-${Date.now()}`;
    const imageFilename = `${postId}.jpg`;
    const imagePath = path.join(feedDir, imageFilename);

    // Write image directly to public assets directory
    fs.writeFileSync(imagePath, buffer);
    console.log(`Saved feed image to ${imagePath} (${buffer.length} bytes)`);

    // Build post record
    const publicImageUrl = `/assets/feed/${imageFilename}?v=${Date.now()}`;
    const cleanTags = Array.isArray(tags) && tags.length > 0
      ? tags
      : ['#AspireHairBathurst', '#BathurstHair', '#SalonTransformation'];

    const newPost = {
      id: postId,
      author: 'Aspire Hair & Body Spa',
      stylistId: stylistName ? stylistName.toLowerCase().replace(/[^a-z0-9]/g, '-') : 'belinda',
      stylistName: stylistName || 'Belinda (Founder)',
      caption: caption || `${styleName || 'Artisanal transformation'} finished at Aspire Hair Bathurst.`,
      tags: cleanTags,
      likes: Math.floor(Math.random() * 30) + 110,
      commentsCount: Math.floor(Math.random() * 6) + 3,
      postedAgo: 'Just now',
      category: category || 'balayage',
      styleName: styleName || 'Salon Transformation',
      formulaNote: formulaNote || 'Custom in-salon bespoke formulation',
      timeSpent: timeSpent || '2.5 hrs',
      imageUrl: publicImageUrl
    };

    // Save into public posts.json
    let currentPosts: any[] = [];
    if (fs.existsSync(feedPostsFile)) {
      try {
        currentPosts = JSON.parse(fs.readFileSync(feedPostsFile, 'utf-8') || '[]');
      } catch (e) {
        currentPosts = [];
      }
    }
    currentPosts.unshift(newPost);
    fs.writeFileSync(feedPostsFile, JSON.stringify(currentPosts, null, 2));

    return res.json({
      success: true,
      message: 'Transformation image saved into public assets for everyone to view',
      post: newPost
    });
  } catch (error) {
    console.error('Failed to create feed post:', error);
    return res.status(500).json({ error: 'Failed to save transformation to assets' });
  }
});

// Delete a feed post from public assets
app.delete('/api/feed-posts/:id', (req, res) => {
  try {
    const { id } = req.params;
    const imageFile = path.join(feedDir, `${id}.jpg`);
    if (fs.existsSync(imageFile)) {
      fs.unlinkSync(imageFile);
    }

    if (fs.existsSync(feedPostsFile)) {
      const currentPosts = JSON.parse(fs.readFileSync(feedPostsFile, 'utf-8') || '[]');
      const filtered = currentPosts.filter((p: any) => p.id !== id);
      fs.writeFileSync(feedPostsFile, JSON.stringify(filtered, null, 2));
    }

    return res.json({ success: true, message: 'Post removed from public assets' });
  } catch (error) {
    console.error('Failed to delete feed post:', error);
    return res.status(500).json({ error: 'Failed to delete feed post' });
  }
});

async function startServer() {
  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: process.env.DISABLE_HMR !== 'true',
        watch: process.env.DISABLE_HMR === 'true' ? null : {},
      },
      appType: 'spa',
    });

    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(__dirname, 'dist');
    app.use(express.static(distDir));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(distDir, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Aspire Hair & Body Spa server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
