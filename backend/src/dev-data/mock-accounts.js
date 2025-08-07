// This is backend/src/dev-data/mock-accounts.js

export const MOCK_IDS = {
  DEV_USER: 'mock_account_dev_user',
  REACT_TEAM: 'mock_account_react_team',
  NODE_JS: 'mock_account_node_js',
};

export const mockAccounts = [
  {
    _id: MOCK_IDS.DEV_USER,
    twitterUserId: '111111',
    username: 'xdevelopers',
    name: 'Developers on X',
    profileImageUrl: 'https://pbs.twimg.com/profile_images/1780283578817978368/wz-9U-aZ_400x400.jpg',
  },
  {
    _id: MOCK_IDS.REACT_TEAM,
    twitterUserId: '222222',
    username: 'reactjs',
    name: 'React',
    profileImageUrl: 'https://pbs.twimg.com/profile_images/1648823849973260293/6-4xK2d7_400x400.jpg',
  },
  {
    _id: MOCK_IDS.NODE_JS,
    twitterUserId: '333333',
    username: 'nodejs',
    name: 'Node.js',
    profileImageUrl: 'https://pbs.twimg.com/profile_images/1648792288094883842/ws-G1iqa_400x400.jpg',
  },
];