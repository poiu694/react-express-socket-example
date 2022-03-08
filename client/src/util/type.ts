export type Message = {
  _id: string;
  nickname: string;
  content: string;
};

export type Item = {
  _id?: string;
  nickname: string;
  content: string;
};

export type RequestBody =
  | { _id: string; nickname: string; content: string }
  | { socketId: string; nickname: string };

export type HandlerType = (msg: Item) => void;
