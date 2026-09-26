'use client'
import ShoppingBagOutlined from '@mui/icons-material/ShoppingBagOutlined'


export function AddToCart() {
    return (
        <div>
            <div className="text-brand-main hover:bg-gray-200 hover:cursor-pointer transition-colors ease-in-out  bg-offwhite-100 rounded-lg p-2">
                <ShoppingBagOutlined />
            </div>
        </div>
    )
}
