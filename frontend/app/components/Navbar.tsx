import { DynamicWidget } from "@dynamic-labs/sdk-react-core"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

export function Navbar() {
  return (
    <nav className="bg-black/80 backdrop-blur-md border-b border-white/10 py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-12">
          <div className="text-white text-2xl font-bold">
            <span className="text-[#FF6521]">Yield</span>AI
          </div>

          <NavigationMenu>
            <NavigationMenuList className="gap-8">
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-base font-normal text-white">Strategies</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[400px] p-4 bg-black/90 backdrop-blur-md border border-white/10">
                    <div className="grid gap-3">
                      <NavigationMenuLink href="#" className="text-white hover:text-[#FF6521] transition-colors">
                        DeFi Yield Farming
                      </NavigationMenuLink>
                      <NavigationMenuLink href="#" className="text-white hover:text-[#FF6521] transition-colors">
                        Optimized Staking
                      </NavigationMenuLink>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-base font-normal text-white">Intelligence</NavigationMenuTrigger>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-base font-normal text-white">Analytics</NavigationMenuTrigger>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <DynamicWidget
          buttonClassName="bg-[#FF6521] hover:bg-[#FF6521]/90 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          innerButtonComponent={<span>Log in or Sign up</span>}
        />
      </div>
    </nav>
  )
}

