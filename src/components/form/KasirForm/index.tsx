"use client";

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { NOMOR_MEJA_OPTIONS, optionType } from '@/constants'
import { kasirFormSchema } from '@/lib/form-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export default function KasirForm() {
    const form = useForm<z.infer<typeof kasirFormSchema>>({
        resolver: zodResolver(kasirFormSchema)
    })

    const onSubmit = (val: z.infer<typeof kasirFormSchema>) => {
        console.log(val)
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
                <div className='flex gap-4'>
                    <FormField
                        control={form.control}
                        name="nomor_meja"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Meja</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger className="w-[450px]">
                                            <SelectValue placeholder="Nomor Meja" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {NOMOR_MEJA_OPTIONS.map(
                                            (
                                                item: optionType,
                                                i: number
                                            ) => (
                                                <SelectItem
                                                    key={item.id + i}
                                                    value={item.id}
                                                >
                                                    {item.label}
                                                </SelectItem>
                                            )
                                        )}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className='mt-8'>
                        <Button size="sm">Print Struk</Button>
                    </div>
                    <div className='mt-8'>
                        <Button size="sm" variant="destructive" >Kosongkan Meja</Button>
                    </div>
                </div>

            </form>
        </Form >
    )
}
