
export interface Message {
    id: string
    conversation: string;
    sender: string;
    text: string;
}

export const mockMessages: Message[] = [
  {
    id: 'msg001',
    conversation: 'abc123',
    sender: 'user',
    text: 'Xin chào admin!'
  },
  {
    id: 'msg002',
    conversation: 'abc123',
    sender: 'admin',
    text: 'Chào bạn, mình có thể giúp gì?'
  },
  {
    id: 'msg003',
    conversation: 'abc123',
    sender: 'user',
    text: 'Tôi cần hỗ trợ đăng nhập.'
  }
];
