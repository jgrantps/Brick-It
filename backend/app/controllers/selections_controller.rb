class SelectionsController < ApplicationController
    def create
        
        
        allowpublic = (selection_permission_params[:isPublic] == "true" ? true : false)
        selection_theme = Theme.find_or_create_by(selection_theme_params)
       
        
        if found_kit = Kit.find_by(:set_num => selection_kit_params[:set_num])
            selected_kit = found_kit
        else
            selected_kit = Kit.create(selection_kit_params)
            selected_kit.theme = selection_theme
            selected_kit.save
        end

        
        selection = Selection.new(:kit_id => selected_kit.id, :public => allowpublic, :user_id => current_user.id)
        
        
        if selection.save
            options = {
                include: [:'kit.theme']
            }
            render json: SelectionSerializer.new(selection, options)
        else
            render json: {main: selection.errors.as_json(full_messages: true), reason: "error!"}
        end
    end

    def index
        collection = current_user.selections
        options = {
            include: [:'kit.theme']
        }

        # serialized_package = SelectionSerializer.new(collection.first, options)
        # render json: serialized_package
        
        serialized_package = []
        collection.each do |selection| 
            unit = SelectionSerializer.new(selection, options)
            serialized_package.push(unit)
        end
# byebug
        
        if serialized_package.empty?
            render json: {"message": "You currently have no selections"}
        else
            # byebug
            render json: serialized_package
        end        
    end

    def show
        selection = Selection.find_by(:id => specific_selection_param[:id].to_i)
        
        if (selection.user == current_user) || (selection.public == true)
            options = {
                include: [:user, :kit, :'kit.theme']
            }
            
            render json: SelectionSerializer.new(selection, options)
        else
            render json: {main: selection.errors.as_json(full_messages: true), reason: "error!"}
        end
    end

    def destroy
    end

private
    
    def selection_kit_params
        params.require(:kit).permit(:name, :set_img_url, :theme_id, :set_num, :theme_api_id, :year, :set_url, :last_modified_dt)
    end 

    def selection_theme_params
        params.require(:theme).permit(:name, :api_id)    
    end
    
    def selection_permission_params
        params.permit(:isPublic)    
    end
    
end
