import DapurForm from '@/components/form/DapurForm'
import KasirForm from '@/components/form/KasirForm'
import MenuForm from '@/components/form/MenuForm'
import OrderForm from '@/components/form/OrderForm'
import Reset from '@/components/reset/Reset'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function Home() {
	return (
		<div>
			<Tabs defaultValue="menu" className='py-5'>
				<div className='flex justify-between'>
					<div className=''>
						<TabsList className="mb-8">
							<TabsTrigger value="menu">Menu</TabsTrigger>
							<TabsTrigger value="order">Order</TabsTrigger>
							<TabsTrigger value="dapur">Dapur</TabsTrigger>
							<TabsTrigger value="kasir">Kasir</TabsTrigger>
						</TabsList>
					</div>
					<div>
						<Reset />
					</div>
				</div>
				<TabsContent value="menu">
					<MenuForm />
				</TabsContent>
				<TabsContent value="order">
					<OrderForm />
				</TabsContent>
				<TabsContent value="dapur">
					<DapurForm />
				</TabsContent>
				<TabsContent value="kasir">
					<KasirForm />
				</TabsContent>
			</Tabs>

		</div>
	)
}
