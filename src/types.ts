export type Status = 'ordered' | 'completed';

export type Category = 'pizza' | 'burger' | 'hotdog' | 'other';

export type Pizza = {
  id: number;
  name: string;
  price: number;
  category?: Category;
};

export type Order = {
  id: number;
  pizza: Pizza;
  status: Status;
  createdAt: number;
};
