import "components/home/ProductListSkeleton.css";

const ProductListSkeleton = () => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <div className="skeleton_wrap">
      <ul className="skeleton_listgroup">
        {arr.map((_, i) => (
          <li key={`skeleton_item_${i}`} className="skeleton_item">
            <div className="skeleton_item_img"></div>
            <p className="skeleton_item_text"></p>
            <p className="skeleton_item_text"></p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductListSkeleton;
