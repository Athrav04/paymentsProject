export default function Send(){
	const alphabet:string = "A";
	const Username:string = "Atharva"
	return(
	<div className="flex justify-center items-center min-h-screen bg-gray-300">
		<div className="bg-white shadow-lg rounded-[20px] w-96 flex flex-col justify-center  mx-auto max-w-md gap-5 px-8 py-8">
			<div className="flex justify-center items-center">
			<p className="text-4xl font-bold text-black">
				Send Money
			</p>
			</div>
			
			<div className="flex flex-col justify-start items-start mt-16">
				<div className="flex justify-center gap-2">
			<div className="rounded-full bg-green-500 h-16 w-16 flex justify-center mt-1 mr-2 ">
					<p className="flex flex-col justify-center h-full text-3xl text-white">{alphabet}</p>
			</div>
			<div className="mt-4 font-bold text-lg">{Username}</div>
			</div>
			<div className="font-medium text-black mt-2">Amount</div>
			<input className="focus:outline-none focus:border-black border w-full rounded-md px-2 h-10" placeholder="Enter amount"></input>
			</div>
			<button className="bg-green-500 py-2 rounded-lg text-white"> Transfer</button>
		</div>
	</div>
	)

}
