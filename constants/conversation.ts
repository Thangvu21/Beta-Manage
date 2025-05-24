
export interface User {
    id: string;
    name: string;
    avatar: string;
}

export interface Conversation {
    id: string;
    user: User;
    adminId: string;
}

export const sampleConversations: Conversation[] = [
  {
    id: "conver001",
    user: {
      id: "user001",
      name: "Nguyễn Văn A",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    adminId: "admin001"
  },
  {
    id: "conver002",
    user: {
      id: "user002",
      name: "Trần Thị B",
      avatar: "https://randomuser.me/api/portraits/women/45.jpg"
    },
    adminId: "admin001"
  },
];
