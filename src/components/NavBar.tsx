interface NavrBarProps {
    size: "big" | "small"
}

export default function NavBar({size} : NavrBarProps) {
    
    const sizes = {
        big: "w-10/100 mind-w-16",
        small: "w-3/100 min-w-8"
    }

    return (
        <div className={sizes[size]}>
          <p className="text-white"></p>
        </div>
    )
}