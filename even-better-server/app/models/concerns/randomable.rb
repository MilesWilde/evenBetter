# app/models/concerns/randomable.rb
module Randomable
  extend ActiveSupport::Concern

  class_methods do
    def random(the_count = 1)
      records = offset(rand(count - the_count)).limit(the_count)
      the_count == 1 ? records.first : records
    end
  end
end
