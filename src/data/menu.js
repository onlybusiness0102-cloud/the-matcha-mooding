// Toàn bộ thực đơn đọc từ ảnh menu. Đơn vị giá: nghìn đồng (25 = 25.000đ).
// sizes: nhãn size; prices: giá tương ứng theo thứ tự. hot: món best-seller (✦).
// theme: 'matcha' | 'hoji' | 'cacao' | 'tea'

export const formatPrice = (k) => `${k}K`

export const categories = [
  {
    id: 'matcha',
    name: 'Matcha',
    theme: 'matcha',
    sizes: ['S', 'M', 'L'],
    items: [
      { name: 'Matcha Latte', hot: true, desc: 'matcha satoen, sữa', prices: [25, 30, 35] },
      { name: 'Matcha Caramel', desc: 'matcha, sữa, caramel', prices: [30, 35, 40] },
      { name: 'Matcha Cold Whisk', desc: 'matcha đánh với sữa lạnh', prices: [33, 37, 42] },
      { name: 'Cookies Salt Cream', hot: true, desc: 'matcha oreo, sữa, kem mặn', prices: [33, 37, 42] },
      { name: 'Matcha Mint (Bạc Hà)', desc: 'matcha, sữa, syrup bạc hà', prices: [30, 35, 40] },
      { name: 'Matcha Trân Châu Mini', desc: 'Matcha, sữa, trân châu hoàng kim mini', prices: [30, 35, 40] },
      { name: 'Coco Matcha Cream', hot: true, desc: 'nước dừa, kem matcha', prices: [30, 35, 40] },
      { name: 'Green Coco', desc: 'nước dừa, matcha nguyên bản (vị chát nhẹ)', prices: [30, 35, 40] },
      { name: 'Matcha Creamy', hot: true, desc: 'kem muối, sữa tươi, matcha', prices: [30, 35, 40] },
      { name: 'Matcha Dâu / Xoài', desc: 'matcha, sữa, mứt dâu / xoài', prices: [30, 35, 40] },
      { name: 'Matcha Earl Grey', hot: true, desc: 'matcha, sữa, syrup trà bá tước', prices: [33, 37, 42] },
      { name: 'Matcha Cheese Cookies', desc: 'matcha, sữa, kem cheese, khúc bạch, oreo', prices: [34, 39, 45] },
    ],
  },
  {
    id: 'houjicha',
    name: 'Houjicha',
    theme: 'hoji',
    sizes: ['S', 'M', 'L'],
    items: [
      { name: 'Houjicha Latte', desc: 'houjicha, sữa', prices: [25, 30, 35] },
      { name: 'Houjicha Cold Whisk', desc: 'houjicha đánh với sữa lạnh', prices: [33, 37, 42] },
      { name: 'Houjicha Cheese Cookies', desc: 'houjicha, sữa, kem cheese, khúc bạch, oreo', prices: [34, 39, 43] },
    ],
  },
  {
    id: 'cacao',
    name: 'Cacao',
    theme: 'cacao',
    sizes: ['S', 'M', 'L'],
    items: [
      { name: 'Cacao Latte', desc: 'Cacao HEYDAY, sữa', prices: [25, 30, 35] },
      { name: 'Cacao Caramel', desc: 'cacao, sữa, caramel', prices: [30, 35, 40] },
      { name: 'Cacao Salt Cream', desc: 'cacao, kem muối', prices: [30, 35, 40] },
      { name: 'Cookies Cacao Cream', desc: 'oreo, sữa, cacao, kem muối', prices: [33, 37, 42] },
      { name: 'Cacao Mint (Bạc hà)', desc: 'Bạc hà, cacao, sữa', prices: [30, 35, 40] },
    ],
  },
  {
    id: 'coco-tea',
    name: 'Coco & Tea',
    theme: 'matcha',
    sizes: ['M', 'L'],
    items: [
      { name: 'Dừa sen lạnh', hot: true, desc: 'Nước dừa, sen, trân châu dừa', prices: [35, 40] },
      { name: 'Nhài sen kem mặn', desc: 'Trà Nhài, sen, kem muối', prices: [32, 37] },
      { name: 'Sen Dừa Matcha / Sen Xanh', desc: 'Nước dừa, sen, kem matcha / Trà Nhài, sen, kem matcha', prices: [38, 43] },
      { name: 'Hồng Trà / Lục Trà Kem Matcha', desc: 'Hồng trà / Lục trà, Kem Matcha', prices: [25, 30] },
      { name: 'Trà Bưởi', desc: 'Hồng Trà, mứt bưởi, Thạch, Trân châu trắng', prices: [25, 30] },
    ],
  },
  {
    id: 'milk-tea',
    name: 'Milk Tea',
    theme: 'tea',
    sizes: ['M', 'L'],
    note: 'Trà sữa không bột béo, healthy, ít calo. Chọn 1 topping FREE (có sẵn): Khúc bạch Phô Mai (4v), Khúc bạch Sữa Oreo (4v), Kem Muối, Kem Matcha, Trân Châu Hoàng Kim, Thạch Mềm, Trân Châu Trắng.',
    // Topping miễn phí đi kèm mỗi ly trà sữa (mặc định chọn 1, món có freeToppingCount sẽ được chọn nhiều hơn)
    freeToppings: [
      'Khúc bạch Phô Mai (4v)',
      'Khúc bạch Sữa Oreo (4v)',
      'Kem Muối',
      'Kem Matcha',
      'Trân Châu Hoàng Kim',
      'Thạch Mềm',
      'Trân Châu Trắng',
    ],
    items: [
      { name: 'Hồng Trà Sữa', desc: 'Hồng trà, sữa, topping có sẵn', prices: [18, 28] },
      { name: 'Lục Trà Sữa', desc: 'Lục trà, sữa, topping có sẵn', prices: [18, 28] },
      { name: 'Trà Sữa Thái Xanh', desc: 'Trà Thái xanh, sữa, topping có sẵn', prices: [18, 28] },
      { name: 'Sữa Tươi / Trà Sữa Caramel Muối', desc: 'Trà sữa, Caramel, Kem Muối, topping có sẵn', prices: [28, 35] },
      { name: 'Trà Sữa Cheese Cookies', desc: 'Trà sữa, Cookies kem cheese, topping có sẵn', prices: [28, 35] },
      { name: 'Trà Sữa Cốm Non', desc: 'Trà sữa, sốt cốm non, topping có sẵn', prices: [35, 40] },
      { name: 'Trà Sữa Full Topping', desc: 'Trà Sữa, kem muối, 3 loại topping', sizes: ['L'], prices: [38], freeToppingCount: 3 },
    ],
  },
  {
    id: 'cold-brew',
    name: 'Cold Brew',
    theme: 'cacao',
    sizes: ['M', 'L'],
    items: [
      { name: 'Cold Brew', desc: 'Cold brew cafe ủ lạnh', prices: [35, 40] },
      { name: 'Cold Brew Dừa', hot: true, desc: 'Cold Brew, Nước dừa', prices: [40, 45] },
      { name: 'Cold Brew Chanh Vàng', desc: 'Cold brew, chanh vàng', prices: [40, 45] },
      { name: 'Cold Brew Bưởi', desc: 'Cold Brew, mứt bưởi', prices: [40, 45] },
    ],
  },
]

// Các mục phụ (không mở popup đặt món, chỉ hiển thị bảng giá)
export const extras = {
  toppings: [
    { name: 'Kem muối / Kem matcha', price: 7 },
    { name: 'Trân Châu Trắng', price: 5 },
    { name: 'Thạch Mềm', price: 5 },
    { name: 'Trân Châu Hoàng Kim MINI', price: 7 },
    { name: 'Khúc Bạch Phô Mai Mặn (3-4 viên)', price: 8 },
    { name: 'Khúc Bạch Sữa Oreo (3-4 viên)', price: 8 },
  ],
  milk: [
    { name: 'Sữa tươi', price: 0, note: 'Mặc định' },
    { name: 'Oat Milk', price: 5 },
    { name: 'Half-Half', price: 4 },
  ],
  options: [
    { name: 'Extra Dâu / Xoài', price: 6 },
    { name: 'Extra Earl Grey', price: 5 },
    { name: 'Extra Caramel', price: 5 },
    { name: 'Extra Cookies', price: 5 },
  ],
  extraShot: [
    { name: 'Extra Matcha 2g', price: 6 },
    { name: 'Extra Houjicha 2g', price: 6 },
    { name: 'Extra Cacao 3g', price: 5 },
  ],
  bottle: {
    title: 'Chai tiết kiệm 500ml',
    note: 'Chưa gồm cốc và đá. Được 3 cốc M.',
    items: [
      { name: 'Matcha / Houjicha / Cacao Latte', price: 75 },
      { name: 'Matcha / Houjicha Cold Whisk', price: 86 },
      { name: 'Trà Sữa Đa Vị', price: 37 },
    ],
  },
  others: [
    { name: 'Cốc đá size M', price: 5 },
    { name: 'Túi đá', price: 10 },
  ],
}
