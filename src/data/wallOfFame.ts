
export interface LeetCoder {
  id: number;
  name: string;
  username: string;
  streak: number;
  profileImage: string;
  badges: string[];
}

export const leaderboard: LeetCoder[] = [
  {
    id: 1,
    name: "Alex Chen",
    username: "algomaster",
    streak: 1562,
    profileImage: "https://randomuser.me/api/portraits/men/32.jpg",
    badges: ["Contest Winner", "Hard Problem Expert"]
  },
  {
    id: 2,
    name: "Sarah Johnson",
    username: "codequeen",
    streak: 1487,
    profileImage: "https://randomuser.me/api/portraits/women/44.jpg",
    badges: ["Dynamic Programming Guru", "Weekly Contest Champion"]
  },
  {
    id: 3,
    name: "Raj Patel",
    username: "leetcode_ninja",
    streak: 1435,
    profileImage: "https://randomuser.me/api/portraits/men/45.jpg",
    badges: ["Graph Theory Expert", "1000+ Problems Solved"]
  },
  {
    id: 4,
    name: "Emily Zhang",
    username: "algoprincess",
    streak: 1388,
    profileImage: "https://randomuser.me/api/portraits/women/68.jpg",
    badges: ["BFS/DFS Master", "Top Contributor"]
  },
  {
    id: 5,
    name: "Michael Brown",
    username: "mikethebeast",
    streak: 1342,
    profileImage: "https://randomuser.me/api/portraits/men/22.jpg",
    badges: ["Tree Algorithm Expert", "Biweekly Contest Winner"]
  },
  {
    id: 6,
    name: "Priya Sharma",
    username: "pscodemaster",
    streak: 1299,
    profileImage: "https://randomuser.me/api/portraits/women/65.jpg",
    badges: ["Binary Search Expert", "Problem Writer"]
  },
  {
    id: 7,
    name: "David Wilson",
    username: "davethegame",
    streak: 1187,
    profileImage: "https://randomuser.me/api/portraits/men/67.jpg",
    badges: ["Backtracking Specialist", "Contest Top 10"]
  },
  {
    id: 8,
    name: "Lisa Wong",
    username: "lisacodes",
    streak: 1125,
    profileImage: "https://randomuser.me/api/portraits/women/33.jpg",
    badges: ["DP Expert", "Algorithm Contributor"]
  }
];
