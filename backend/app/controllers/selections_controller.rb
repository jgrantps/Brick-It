class SelectionsController < ApplicationController
    def create
        byebug
        selection = Selection.new(selections_params)
        if selection.save
            options = {
                include: [:user, :kit]
            }
            render json: SelectionSerializer.new(selection, options)
        else
            render json: {main: selection.errors.as_json(full_messages: true), reason: "error!"}
        end
    end

    def index
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
    
    def selections_params
        params.permit(:selection).require(:id, :user_id, :kit_id)
    end   
    
    def specific_selection_param
        params.permit(:id)
    end

    
end
