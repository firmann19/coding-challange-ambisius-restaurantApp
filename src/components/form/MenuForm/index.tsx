"use client";

import TitleForm from "@/components/atoms/TitleForm";
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { menuFormSchema } from "@/lib/form-schema";
import { FC, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface MenuFormProps {

}

const MenuForm: FC<MenuFormProps> = ({ }) => {
	const [editorLoaded, setEditorLoaded] = useState<boolean>(false);

	return (
		<div>
			<div className="my-5">
				<TitleForm
					title="Menu Information"
					subtitle="This is menu information that you can order"
				/>
			</div>

			<Separator className="mb-7" />
		

		</div>
	);
};

export default MenuForm;