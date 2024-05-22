import { IProductCounterProps } from "@/types/goods"

const ProductCounter = ({ className, count }: IProductCounterProps): JSX.Element => {
  return (
    <div className={className}>
      <button className="btn-reset">-</button>
      <span>{count}</span>
      <button className="btn-reset">+</button>
    </div>
  );
}

export default ProductCounter;
