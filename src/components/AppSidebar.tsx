import { useState } from "react";
import { ChevronRight, Folder, FolderOpen } from "lucide-react";
import { Category } from "@/types/Product";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

interface AppSidebarProps {
  categories: Category[];
  selectedCategory: string;
  onCategorySelect: (categorySlug: string) => void;
}

export function AppSidebar({ categories, selectedCategory, onCategorySelect }: AppSidebarProps) {
  const { open } = useSidebar();
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  const parentCategories = categories.filter(cat => cat.isParent);
  const getChildCategories = (parentId: string) => 
    categories.filter(cat => cat.parentId === parentId);

  const toggleCategory = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  const handleCategoryClick = (category: Category) => {
    if (category.isParent) {
      toggleCategory(category.id);
      onCategorySelect(category.slug);
    } else {
      onCategorySelect(category.slug);
    }
  };

  const isSelected = (categorySlug: string) => selectedCategory === categorySlug;

  return (
    <Sidebar className={open ? "w-64" : "w-14"}>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Categories</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => onCategorySelect('all')}
                  className={isSelected('all') ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted/50"}
                >
                  <Folder className="h-4 w-4 mr-2" />
                  {open && <span>All Categories</span>}
                </SidebarMenuButton>
              </SidebarMenuItem>

              {parentCategories.map((parentCategory) => {
                const isExpanded = expandedCategories.has(parentCategory.id);
                const childCategories = getChildCategories(parentCategory.id);
                const hasChildren = childCategories.length > 0;

                return (
                  <div key={parentCategory.id}>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        onClick={() => handleCategoryClick(parentCategory)}
                        className={`${isSelected(parentCategory.slug) ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted/50"} ${hasChildren ? "justify-between" : ""}`}
                      >
                        <div className="flex items-center">
                          {isExpanded ? (
                            <FolderOpen className="h-4 w-4 mr-2" />
                          ) : (
                            <Folder className="h-4 w-4 mr-2" />
                          )}
                          {open && <span>{parentCategory.name}</span>}
                        </div>
                        {hasChildren && open && (
                          <ChevronRight 
                            className={`h-4 w-4 transition-transform ${isExpanded ? "rotate-90" : ""}`}
                          />
                        )}
                      </SidebarMenuButton>
                    </SidebarMenuItem>

                    {isExpanded && open && childCategories.map((childCategory) => (
                      <SidebarMenuItem key={childCategory.id}>
                        <SidebarMenuButton
                          onClick={() => onCategorySelect(childCategory.slug)}
                          className={`pl-8 ${isSelected(childCategory.slug) ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted/50"}`}
                        >
                          <span className="text-sm">└ {childCategory.name}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </div>
                );
              })}

              {/* Standalone categories (no parent) */}
              {categories
                .filter(category => !category.isParent && !category.parentId)
                .map(category => (
                  <SidebarMenuItem key={category.id}>
                    <SidebarMenuButton
                      onClick={() => onCategorySelect(category.slug)}
                      className={isSelected(category.slug) ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted/50"}
                    >
                      <Folder className="h-4 w-4 mr-2" />
                      {open && <span>{category.name}</span>}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}