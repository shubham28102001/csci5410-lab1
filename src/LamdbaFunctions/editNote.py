import json
import boto3
import uuid

bucketName = 'csci5410-lab1'
s3Client = boto3.client('s3')
dynamoDB = boto3.resource('dynamodb')
table = dynamoDB.Table('csci5410-lab1')

def lambda_handler(event, context):
    try:
        body = json.loads(event['body'])
        # fetching note text
        text = body['text']
        # fetching noteid
        noteId = body['noteId']

        # putting item in table
        data = table.get_item(Key={'noteId': noteId})
        # getting filename from data
        fileName = data['Item']['fileName']
        # putting object to s3
        s3Client.put_object(Bucket=bucketName, Key=fileName, Body=text)

        return {
            'statusCode': 200,
            'headers': {
                "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,X-Amz-Security-Token,Authorization,X-Api-Key,X-Requested-With,Accept,Access-Control-Allow-Methods,Access-Control-Allow-Origin,Access-Control-Allow-Headers",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*",
            },
            'body': json.dumps({'result': 'success'})
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,X-Amz-Security-Token,Authorization,X-Api-Key,X-Requested-With,Accept,Access-Control-Allow-Methods,Access-Control-Allow-Origin,Access-Control-Allow-Headers",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*",
            },
            'body': json.dumps({'result': 'Error editing note'})
        }