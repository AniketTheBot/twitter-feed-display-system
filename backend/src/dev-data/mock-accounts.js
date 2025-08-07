// This is the final backend/src/dev-data/mock-accounts.js

export const MOCK_IDS = {
  DEV_USER: '2244994945', // Real ID for @XDevelopers
  REACT_TEAM: '1351538328453414913', // Real ID for @reactjs
  NODE_JS: '97434313', // Real ID for @nodejs
};

export const mockAccounts = [
  {
    _id: MOCK_IDS.DEV_USER,
    twitterUserId: '2244994945',
    username: 'xdevelopers',
    name: 'Developers on X',
    profileImageUrl: 'https://pbs.twimg.com/profile_images/1780283578817978368/wz-9U-aZ_400x400.jpg',
  },
  {
    _id: MOCK_IDS.REACT_TEAM,
    twitterUserId: '1351538328453414913',
    username: 'reactjs',
    name: 'React',
    profileImageUrl: 'https://pbs.twimg.com/profile_images/1648823849973260293/6-4xK2d7_400x400.jpg',
  },
  {
    _id: MOCK_IDS.NODE_JS,
    twitterUserId: '97434313',
    username: 'nodejs',
    name: 'Node.js',
    profileImageUrl: 'https://pbs.twimg.com/profile_images/1648792288094883842/ws-G1iqa_400x400.jpg',
  },
];