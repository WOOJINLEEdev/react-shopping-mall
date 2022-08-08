import "components/home/ProductListSkeleton.css";

const ProductListSkeleton = () => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <div className="product_skeleton_wrap">
      <ul className="product_skeleton_listgroup">
        {arr.map((_, i) => (
          <li
            key={`product_skeleton_item_${i}`}
            className="product_skeleton_item"
          >
            <div className="product_skeleton_item_img" />
            <p className="product_skeleton_item_text" />
            <p className="product_skeleton_item_text" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductListSkeleton;
