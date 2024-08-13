"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function NotFound() {
	const router = useRouter();
	return (
		<>
			{/* code by Naved khan, source: https://codepen.io/Navedkhan012/pen/vrWQMY */}
			<section className="page_404">
				<div className="container">
					<div className="row">
						<div className="col-sm-12 ">
							<div className="col-sm-10 col-sm-offset-1  text-center">
								<div className="four_zero_four_bg">
									<h1 className="text-center">404</h1>
								</div>

								<div className="contant_box_404">
									<h3 className="h2">Look like you&apos;re lost</h3>

									<p>the page you are looking for not avaible!</p>

									<Button
										variant="outline"
										className="mt-10"
										onClick={() => router.push("/")}
									>
										Go to Home
									</Button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
