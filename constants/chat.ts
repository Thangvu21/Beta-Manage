
export interface Message {
    id: string
    conversationId: string;
    sender: string;
    text: string;
}

export const mockMessages: Message[] = [
  {
    id: 'msg001',
    conversationId: 'abc123',
    sender: 'user',
    text: 'Xin chào admin!'
  },
  {
    id: 'msg002',
    conversationId: 'abc123',
    sender: 'admin',
    text: 'Chào bạn, mình có thể giúp gì?'
  },
  {
    id: 'msg003',
    conversationId: 'abc123',
    sender: 'user',
    text: 'Tôi cần hỗ trợ đăng nhập.'
  }
];
