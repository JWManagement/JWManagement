import SimpleSchema from 'simpl-schema'
import { Mongo } from 'meteor/mongo'

export Counts = new Mongo.Collection 'counts'

Counts.deny
	insert: -> true
	update: -> true
	remove: -> true
