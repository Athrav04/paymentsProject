export default function UserCard({onChange}){
	return (
	<section className="flex flex-col justify-center items-start min-w-full">
		<p className="ml-7 mt-2 text-2xl font-bold text-black">Users :</p>
		<div className="min-w-full ml-7">
		<input className="focus:outline-none rounded-md h-10 focus:border-black border-2 w-full mt-5 px-2 py-1 overflow-x-hidden" placeholder="Search User..." onChange={onChange}></input>
		</div>
		
	</section>
	
	)
}
