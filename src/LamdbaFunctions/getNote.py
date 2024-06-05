import json
import boto3

bucketName = 'csci5410-lab1'
s3Client = boto3.client('s3')
dynamoDB = boto3.resource('dynamodb')
table = dynamoDB.Table('csci5410-lab1')

def lambda_handler(event, context):
    try:
        noteId = event['queryStringParameters']['noteId']
        
        data = table.get_item(Key={'noteId': noteId})
        fileName = data['Item']['fileName']
        file = s3Client.get_object(Bucket=bucketName, Key=fileName)
        text = file['Body'].read().decode('utf-8')
        
        return {
            'statusCode': 200,
            'headers': {
                "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,X-Amz-Security-Token,Authorization,X-Api-Key,X-Requested-With,Accept,Access-Control-Allow-Methods,Access-Control-Allow-Origin,Access-Control-Allow-Headers",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*",
            },
            'body': json.dumps({'result': 'success', 'noteId': noteId, 'text': text})
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,X-Amz-Security-Token,Authorization,X-Api-Key,X-Requested-With,Accept,Access-Control-Allow-Methods,Access-Control-Allow-Origin,Access-Control-Allow-Headers",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*",
            },
            'body': json.dumps({'result': 'Error fetching note'})
        }