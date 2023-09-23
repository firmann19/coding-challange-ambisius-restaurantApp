import MenuForm from '@/components/form/MenuForm'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Image from 'next/image'

export default function OrderForm() {
	return (
		<div>
			<Tabs defaultValue="meja1" className='py-5'>
				<TabsList className="mb-8">
					<TabsTrigger value="meja1">Meja 1</TabsTrigger>
					<TabsTrigger value="meja2">Meja 2</TabsTrigger>
					<TabsTrigger value="meja3">Meja 3</TabsTrigger>
				</TabsList>
			</Tabs>
		</div>
	)
}
