import Image from "next/image";

interface ProfileProps {
    avatar: string,
    name: string,
    player: string
    currentPlayer: string
}
export function Profile({avatar, name, player, currentPlayer}: ProfileProps) {
    return (
        <div className="size-auto flex gap-2 justify-center items-center">
           <div className={`${currentPlayer == player && 'w-auto p-1 border-4 border-blue-700 rounded-full animate-pulse duration-700'} transition-all duration-200`}>
           <div className="w-16 h-16 rounded-full overflow-hidden">
                <Image  
                    src={avatar}
                    alt="Avatar de Lorrys Code" 
                    width={64} 
                    height={64} 
                    className="object-cover"
                />
            </div>
           </div>
            
            <div>
                <h2 className="text-slate-100 text-md font-semibold">{name}</h2>
                <p className="text-sm font-medium text-zinc-300">Jogador: {player}</p>
            </div>
        </div>
    );
}
