export type Coupon = {
  id: string;
  code: string;
  discountAmount?: number;
  discountPercent?: number;
  usageLimit?: number;
  timesUsed: number;
  isActive: boolean;
  validUntil?: Date;
  createdAt: Date;
  updatedAt: Date;
}